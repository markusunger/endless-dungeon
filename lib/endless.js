const mapGenerator = require('./mapGenerator');
const render = require('./renderer');

const TICK_RATE = 3000;
// sets the time in ms where the app checks for possible state updates
const RENDER_MODE = 2;
// which renderer to choose:
// 0: console (for debugging)
// 1: scroll phat hd
// 2: unicorn hat hd

setInterval(() => {
  const map = mapGenerator();
  render(RENDER_MODE, map);
}, TICK_RATE);
