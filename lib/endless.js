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
        renderer.renderTerminal(mapState, fps);
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
