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
          if (map.at(i, j).type === 'floor') {
            unicorn.setPixel(j, i, 5, 5, 5);
          } else {
            unicorn.setPixel(j, i, 230, 130, 50);
          }
        }
      }
      unicorn.show();
    },
  };
}());


// module.exports = (function renderToOutput() {
//   function toConsole(map) {
//     let line = '';
//     for (let i = 0; i < map.height; i += 1) {
//       for (let j = 0; j < map.width; j += 1) {
//         line += (map.at(i, j).type === 'floor') ? '.' : '#';
//       }
//       console.log(line);
//       line = '';
//     }
//     console.log();
//   }

//   function toDisplay(map) {
//     const output = map.map.map(row => row.map((tile) => {
//       if (tile.type === 'floor') return 0;
//       return 100;
//     }));
//     sc.display(output.reduce((arr, row) => arr.concat(row), []));
//   }

  // function toUnicorn(map) {
    
//   }

//   process.on('SIGINT', () => {
//     console.log('Abort!');
//     if (unicorn) {
//       unicorn.clear();
//       unicorn.show();
//     }
//     process.exit();
//   });

//   return function output(mode, map) {
//     if (mode === 0) toConsole(map);
//     if (mode === 1) toDisplay(map);
//     if (mode === 2) {
//       toUnicorn(map);
//     }
//   };
// }());
