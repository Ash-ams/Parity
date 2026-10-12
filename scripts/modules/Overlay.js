var Overlay = (function() {
  // Parts of the DOM
  var button;
  var overlay;
  var mainMenu;
  var levelSelect;
  var rulesModal;

  // Other variables
  var active = false;

  // Handler for when the legacy story overlay button is pressed
  var pressButton = function() {
    if(active) {
      button.addClass('active'); //TODO: implement this properly
      mediator.publish('story_advance');
    }
  };

  // Renders the legacy story overlay
  var render = function(data) {
    hideAllMenus();
    overlay.fadeOut(options.fade, function() {
      mediator.publish('board_set_inactive');
      overlay.fadeIn(options.fade);
      active = true;

      var title   = data.title;
      var content = data.text;
      var action  = data.button;

      $('#overlay > h1').html(title);
      $('#overlay > #content').html(content);
      if(action) {
        // There's a very special case here if the game has been completed
        if(action == "%fb%") {
//          $('#holder').html('<a href="#">let me do it again.</a>');
        }
        else {
          button.show();
          button.html(action);
        }
      }
      else
        button.hide();
    });
  };

  // Fades out the overlay and sets it as inactive
  var setInactive = function() {
    overlay.fadeOut(options.fade);
    active = false;
  };

  // Visibility handlers
  var hideAllMenus = function() {
    (mainMenu || $('#main-menu')).hide();
    (levelSelect || $('#level-select')).hide();
    (rulesModal || $('#rules-modal')).hide();
  };

  var showMainMenu = function() {
    hideAllMenus();
    if (overlay) overlay.hide(); else $('#overlay').hide();
    active = false;
    (mainMenu || $('#main-menu')).show();
  };

  var showLevelSelect = function() {
    hideAllMenus();
    if (overlay) overlay.hide(); else $('#overlay').hide();
    active = false;
    (levelSelect || $('#level-select')).show();
  };

  var showRules = function() {
    (rulesModal || $('#rules-modal')).show();
  };

  var hideRules = function() {
    (rulesModal || $('#rules-modal')).hide();
  };

  // Renders level grid buttons dynamically
  var renderLevelSelect = function(totalLevels, highestUnlocked) {
    totalLevels = totalLevels || 100;
    highestUnlocked = (typeof highestUnlocked === 'number' && highestUnlocked >= 1) ? highestUnlocked : 1;

    var grid = $('#level-grid');
    grid.empty();

    for (var i = 1; i <= totalLevels; i++) {
      var isUnlocked = i <= highestUnlocked;
      var isCompleted = i < highestUnlocked;
      var isCurrent = i === highestUnlocked;

      var btn = $('<button></button>')
        .addClass('level-btn')
        .attr('type', 'button')
        .attr('data-level', i);

      btn.text(i);

      if (!isUnlocked) {
        btn.addClass('locked')
           .attr('disabled', 'disabled');
      } else {
        if (isCurrent) {
          btn.addClass('current');
        } else if (isCompleted) {
          btn.addClass('completed');
        }
      }

      grid.append(btn);
    }

    // Event delegation with unbinding prior clicks to prevent duplicate event firing
    grid.off('click', '.level-btn').on('click', '.level-btn', function() {
      var $btn = $(this);
      if ($btn.hasClass('locked') || $btn.is(':disabled')) {
        return;
      }
      var levelNum = parseInt($btn.attr('data-level'), 10);
      if (!isNaN(levelNum)) {
        mediator.publish('go_to_level', levelNum);
      }
    });
  };

  var domReady = function() {
    button = $('#overlay > #holder > button');
    overlay = $('#overlay');
    mainMenu = $('#main-menu');
    levelSelect = $('#level-select');
    rulesModal = $('#rules-modal');

    // Event Bindings for legacy overlay
    button.off('click').on('click', pressButton);

    // Static UI Navigation buttons
    $('#nav-menu-btn').off('click').on('click', function(e) {
      e.preventDefault();
      mediator.publish('return_to_menu');
    });

    $('#nav-rules-btn').off('click').on('click', function(e) {
      e.preventDefault();
      mediator.publish('show_rules');
    });

    // Menu action buttons
    $('#menu-play-btn').off('click').on('click', function(e) {
      e.preventDefault();
      mediator.publish('menu_play');
    });

    $('#menu-levels-btn').off('click').on('click', function(e) {
      e.preventDefault();
      mediator.publish('menu_level_select');
    });

    $('#levels-back-btn').off('click').on('click', function(e) {
      e.preventDefault();
      mediator.publish('return_to_menu');
    });

    // Rules modal close button & backdrop dismissal
    $('#rules-close-btn').off('click').on('click', function(e) {
      e.preventDefault();
      hideRules();
    });

    rulesModal.off('click').on('click', function(e) {
      if ($(e.target).is('#rules-modal')) {
        hideRules();
      }
    });
  };

  // The facade
  return {
    pressButton: pressButton,
    render: render,
    setInactive: setInactive,
    domReady: domReady,
    showMainMenu: showMainMenu,
    showLevelSelect: showLevelSelect,
    showRules: showRules,
    hideRules: hideRules,
    hideAllMenus: hideAllMenus,
    renderLevelSelect: renderLevelSelect
  };
}());

// Add the mediator to the module
mediator.installTo(Overlay);

// Subscribe to messages

// Listen for space and enter to forward the events to the button press
Overlay.subscribe('controls_key_space', Overlay.pressButton);
Overlay.subscribe('controls_key_enter', Overlay.pressButton);

// Listen for instruction to draw the overlay
Overlay.subscribe('overlay_render', Overlay.render);

// Listen for instruction to deactivate this overlay
Overlay.subscribe('overlay_set_inactive', Overlay.setInactive);

Overlay.subscribe('loader_dom_ready', Overlay.domReady);
$(document).ready(Overlay.domReady);
