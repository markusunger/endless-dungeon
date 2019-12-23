const termkit = require('terminal-kit');
const Uc = require('unicornhat-hd');

const tiles = require('../data/tiles');

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
  } catch (e) {
    console.log(`Couldn't initialize unicorn hat! ${e}`);
  }

  process.on('SIGINT', () => {
    if (unicorn) {
      unicorn.clear();
      unicorn.show();
    }
    term.reset();
    process.exit();
  });

  term.fullscreen();
  term.hideCursor();
  term.setPalette('gnome');

  return {
    renderTerminal: function renderTerminal(map, fps) {
      // renders terminal output

      // TODO: colors for terminal output still don't work,
      //       i have no idea why not
      buffer.clear();
      buffer.moveTo(0, 0);

      const attr = { };

      const fpsString = String(fps);
      buffer.put({ attr }, fpsString);

      let col = fpsString.length;
      let row = 0;

      while (col < map.width) {
        buffer.put({ x: col, y: 0, attr }, ' ');
        col += 1;
      }

      row += 1;
      col = 0;

      for (let i = 0; i < map.height; i += 1) {
        for (let j = 0; j < map.width; j += 1) {
          const tile = tiles[map.at(i, j).name];
          const [r, g, b] = tile.color;
          attr.color = { r, g, b };
          buffer.put({ x: col, y: row, attr }, tile.symbol);
          col += 1;
        }
        col = 0;
        row += 1;
      }
      buffer.draw();
    },

    renderDisplay: function renderDisplay(map) {
      // renders output on unicorn display
      unicorn.clear();
      unicorn.setBrightness(0.4);
      for (let i = 0; i < map.height; i += 1) {
        for (let j = 0; j < map.width; j += 1) {
          const tile = tiles[map.at(i, j).name];
          unicorn.setPixel(j, i, ...tile.color);
        }
      }
      unicorn.show();
    },
  };
}());
