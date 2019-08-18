const sc = require('scroll-controller');

module.exports = (function renderToOutput() {
  function toConsole(map) {
    let line = '';
    for (let i = 0; i < map.height(); i += 1) {
      for (let j = 0; j < map.width(); j += 1) {
        line += (map.at(i, j).type === 'floor') ? '.' : '#';
      }
      console.log(line);
      line = '';
    }
    console.log();
  }

  function toDisplay(map) {
    const output = map.map(row => row.map((tile) => {
      if (tile.type === 'floor') return 0;
      return 100;
    }));
    sc.display(output.reduce((arr, row) => arr.concat(row), []));
  }

  return function output(mode, map) {
    if (mode === 0) toConsole(map);
    if (mode === 1) toDisplay(map);
  };
}());
