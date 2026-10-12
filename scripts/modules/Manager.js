var Manager = (function() {
  var saveObject = {
    played_levels: [],
    visited_instructions: [],
    last_level: -1
  };
  var totalLevels = 100;

  var hideBoard = function() {
    $('#board').hide();
    $('#selector').hide();
    $('#introtutorial').hide();
    mediator.publish('board_set_inactive');
  };

  var showBoard = function() {
    $('#board').show();
    $('#selector').show();
  };

  var showMainMenu = function() {
    hideBoard();
    Overlay.showMainMenu();
  };

  var showLevelSelect = function() {
    hideBoard();
    var highestUnlocked = 1;
    if (saveObject) {
      if (saveObject.played_levels && saveObject.played_levels.length > 0) {
        highestUnlocked = Math.max.apply(null, saveObject.played_levels);
      } else if (saveObject.last_level && saveObject.last_level > 0) {
        highestUnlocked = saveObject.last_level;
      }
    }
    Overlay.renderLevelSelect(totalLevels, highestUnlocked);
    Overlay.showLevelSelect();
  };

  var showRules = function() {
    Overlay.showRules();
  };

  var returnToMenu = function() {
    showMainMenu();
  };

  var menuPlay = function() {
    Overlay.hideAllMenus();
    showBoard();

    var targetLevel = 1;
    if (saveObject && saveObject.last_level && saveObject.last_level > 0) {
      targetLevel = saveObject.last_level;
    }
    mediator.publish('go_to_level', targetLevel);
  };

  var onBoardRender = function() {
    Overlay.hideAllMenus();
    showBoard();
  };

  var setSaveData = function(so) {
    if (so) {
      saveObject = so;
    }
  };

  var setTotalLevels = function(n) {
    if (n && n > 0) {
      totalLevels = n;
    }
  };

  return {
    showMainMenu: showMainMenu,
    showLevelSelect: showLevelSelect,
    showRules: showRules,
    returnToMenu: returnToMenu,
    menuPlay: menuPlay,
    onBoardRender: onBoardRender,
    setSaveData: setSaveData,
    setTotalLevels: setTotalLevels
  };
}());

// Add the mediator to the module
mediator.installTo(Manager);

// Loads the cookies when the story is finally loaded
Manager.subscribe('loader_story_loaded', function() {
  mediator.publish('cookie_data_load');
});

// Update save data state when loaded
Manager.subscribe('cookie_data_load_complete', Manager.setSaveData);

// Save total levels count from Story
Manager.subscribe('story_num_levels', Manager.setTotalLevels);

// UI Event subscriptions mapped to state machine handlers
Manager.subscribe('show_main_menu', Manager.showMainMenu);
Manager.subscribe('show_level_select', Manager.showLevelSelect);
Manager.subscribe('menu_level_select', Manager.showLevelSelect);
Manager.subscribe('show_rules', Manager.showRules);
Manager.subscribe('return_to_menu', Manager.returnToMenu);
Manager.subscribe('menu_play', Manager.menuPlay);

// When a board is rendered (from level select or story advance), restore visibility and hide menus
Manager.subscribe('board_render', Manager.onBoardRender);