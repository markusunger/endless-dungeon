const sc = require('scroll-controller');
const Uc = require('unicornhat-hd');

// const unicorn = new Uc('/dev/spidev0.0');

module.exports = (function renderToOutput() {
  function toConsole(map) {
    let line = '';
    for (let i = 0; i < map.height; i += 1) {
      for (let j = 0; j < map.width; j += 1) {
        line += (map.at(i, j).type === 'floor') ? '.' : '#';
      }
      console.log(line);
      line = '';
    }
    console.log();
  }

  function toDisplay(map) {
    const output = map.map.map(row => row.map((tile) => {
      if (tile.type === 'floor') return 0;
      return 100;
    }));
    sc.display(output.reduce((arr, row) => arr.concat(row), []));
  }

  function toUnicorn(map) {
    unicorn.clear();
    unicorn.setBrightness(0.4);
    for (let i = 0; i < map.height; i += 1) {
      for (let j = 0; j < map.width; j += 1) {
        if (map.at(i, j).type === 'floor') {
          unicorn.setPixel(j, i, 10, 10, 10);
        } else {
          unicorn.setPixel(j, i, 128, 60, 60);
        }
      }
    }
    unicorn.show();
  }

  return function output(mode, map) {
    if (mode === 0) toConsole(map);
    if (mode === 1) toDisplay(map);
    if (mode === 2) toUnicorn(map);
  };
}());
