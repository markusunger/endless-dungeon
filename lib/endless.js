require('dotenv').config();

const renderer = require('./renderer');
const levelManager = require('./level');

const TICK_RATE = 1000 / 60;
// sets the time in ms where the app checks for possible state updates
// 16: roughly 60 fps on output display

(function mainLoop() {
  // at the start, create new map and initialize level
  const level = Object.create(levelManager);
  level.init();
  let time = Date.now();
  let fpsTime = time;
  let fps = 0;

  // start the main loop
  setInterval(() => {
    const newTime = Date.now();
    if (newTime >= time + TICK_RATE) {
      const updateNecessary = level.update(newTime - time);
      if (updateNecessary) {
        const mapState = level.state();
        if (process.env.DST === 'term') {
          renderer.renderTerminal(mapState, fps);
        }
        if (process.env.DST === 'disp') {
          renderer.renderDisplay(mapState);
        }
        time = Date.now();
      }
      if (fpsTime + 1000 >= newTime) {
        fps += 1;
      } else {
        fps = 0;
        fpsTime = newTime;
      }
    }
  }, TICK_RATE);
}());
