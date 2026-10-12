const fs = require('fs');
const path = require('path');

const srcFiles = [
  'scripts/lib/jquery-2.1.1.min.js',
  'scripts/lib/jquery.touchSwipe.min.js',
  'scripts/core.js',
  'scripts/modules/Board.js',
  'scripts/modules/Keyboard.js',
  'scripts/modules/Manager.js',
  'scripts/modules/Overlay.js',
  'scripts/modules/Selector.js',
  'scripts/modules/StateData.js',
  'scripts/modules/Story.js',
  'scripts/modules/Swipe.js',
  'scripts/modules/Window.js'
];

console.log('Concatenating files...');
const contents = srcFiles.map(file => {
  const fullPath = path.resolve(__dirname, file);
  console.log('Reading:', file);
  return fs.readFileSync(fullPath, 'utf8');
});

const bundle = contents.join('\n;\n');
fs.writeFileSync(path.resolve(__dirname, 'scripts/production.js'), bundle, 'utf8');
fs.writeFileSync(path.resolve(__dirname, 'scripts/production.min.js'), bundle, 'utf8');
console.log('Successfully written scripts/production.js and scripts/production.min.js! Size:', bundle.length);
