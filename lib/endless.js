require('dotenv').config();

const renderer = require('./renderer');
const levelManager = require('./level');

const TICK_RATE = 1000 / 60;
// sets the state update interval to 60 updates/second

module.exports = function mainLoop() {
  // at the start, create new map and initialize level
  const level = Object.create(levelManager);
  level.init();
  let time = Date.now();
  let fps = 0;

  // start the main loop
  const iid = setInterval(() => {
    const newTime = Date.now();
    if (newTime >= time + TICK_RATE) {
      const rerenderNeeded = level.update(newTime);

      const mapState = level.state();
      if (rerenderNeeded) {
        if (process.env.DST === 'term') {
          renderer.renderTerminal(mapState, fps);
        }
        if (process.env.DST === 'disp') {
          renderer.renderDisplay(mapState);
        }
      }
      fps = Math.ceil(1 / ((newTime - time) / 1000));
      time = Date.now();

      if (level.completed) {
        clearInterval(iid);
        mainLoop();
      }
    }
  }, TICK_RATE);
};
