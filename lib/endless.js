const sc = require('scroll-controller');
const mapGenerator = require('./mapGenerator');

const TICK_RATE = 1000;
// sets the time in ms where the app checks for possible state updates
const RENDER_MODE = 0;
// which renderer to choose:
// 0: console (for debugging)
// 1: scroll phat hd

setInterval(() => {
  const map = mapGenerator();
  const height = map.length;
  const width = map[0].length;

  if (RENDER_MODE === 0) {
    let line = '';
    for (let i = 0; i < height; i += 1) {
      for (let j = 0; j < width; j += 1) {
        line += (map[i][j].type === 'floor') ? '.' : '#';
      }
      console.log(line);
      line = '';
    }
    console.log();
  } else {
    sc.display(map.map(row => row.map((tile) => {
      if (tile.type === 'floor') return 0;
      return 100;
    })));
  }
}, TICK_RATE);
