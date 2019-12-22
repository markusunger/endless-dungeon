const renderer = require('./renderer');

const levelManager = require('./level');

const TICK_RATE = 16;
// sets the time in ms where the app checks for possible state updates
// 16: roughly 60 fps on output display

(function mainLoop() {
  // at the start, create new map and initialize level
  const level = Object.create(levelManager);
  level.init();
  let time = Date.now();

  // start the main loop
  setInterval(() => {
    const newTime = Date.now();

    if (newTime >= time + TICK_RATE) {
      const updateNecessary = level.update(newTime - time);
      if (updateNecessary) {
        const mapState = level.state();
        renderer.renderTerminal(mapState, newTime - time);
        time = Date.now();
      }
    }
  }, TICK_RATE);
}());
