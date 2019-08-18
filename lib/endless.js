const mapGenerator = require('./mapGenerator');
const render = require('./renderer');

const TICK_RATE = 1000;
// sets the time in ms where the app checks for possible state updates
const RENDER_MODE = 0;
// which renderer to choose:
// 0: console (for debugging)
// 1: scroll phat hd

setInterval(() => {
  const map = mapGenerator();
  render(RENDER_MODE, map);
}, TICK_RATE);
