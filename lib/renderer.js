const termkit = require('terminal-kit');
const Uc = require('unicornhat-hd');

const tiles = require('./tiles');

const term = termkit.terminal;

module.exports = (function output() {
  const buffer = new termkit.ScreenBuffer({
    dst: term,
    width: 16,
    height: 18,
  });

  let unicorn;
  try {
    unicorn = new Uc('/dev/spidev0.0');
  } catch(e) {
    console.log(`Couldn't initialize unicorn hat! ${e}`);
  }

  process.on('SIGINT', () => {
    if (unicorn) {
      unicorn.clear();
      unicorn.show();
    }
    process.exit();
  });

  term.fullscreen();
  term.hideCursor();

  return {
    renderTerminal: function renderTerminal(map, fps) {
      // renders terminal output
      let mapString = String(fps);
      while (mapString.length < map.width) {
        mapString += ' ';
      }
      for (let i = 0; i < map.height; i += 1) {
        for (let j = 0; j < map.width; j += 1) {
          const tile = tiles[map.at(i, j).type];
          mapString += tile.symbol;
        }
      }
      buffer.clear();
      buffer.moveTo(0, 0);
      buffer.put({
        markup: false,
        wrap: true,
      }, mapString);
      buffer.draw({ });
    },

    renderDisplay: function renderDisplay(map) {
      // renders output on unicorn display
      unicorn.clear();
      unicorn.setBrightness(0.4);
      for (let i = 0; i < map.height; i += 1) {
        for (let j = 0; j < map.width; j += 1) {
          const tile = tiles[map.at(i, j).type];
          unicorn.setPixel(j, i, ...tile.color);
        }
      }
      unicorn.show();
    },
  };
}());
