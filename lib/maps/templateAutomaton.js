/* The Cellular Automaton works just like any CA does. Tweaking the constants
   should only happen carefully here because changes can have wild effects on
   the generated maps. In general, the algorithm provides great variety with
   the same set of parameters, so a runtime tweaking doesn't make sense. */

const map = require('./mapObject');
const tiles = require('../../data/tiles');

module.exports = (function cellularAutomaton() {
  const WALL_CHANCE = 0.6; // the chance of a wall placement in the initial setup
  const ITERATIONS = 3; // the number of times the CA algorithm runs
  const WALL_EVOLUTION = 5; // the number of neighbor walls to form a new wall
  const WALL_STARVE = 3; // the minimum number of neighbor walls to keep a wall alive

  return function generate(width, height) {
    let template = Object.create(map);
    template.init(width, height);
    template.create();

    // fill empty map with random wall distribution
    for (let i = 0; i < template.height; i += 1) {
      for (let j = 0; j < template.width; j += 1) {
        const newType = Math.random() > WALL_CHANCE ? 'floor' : 'wall';
        template.set(i, j, newType);
      }
    }

    for (let i = 0; i < ITERATIONS; i += 1) {
      const newTemplate = Object.create(map); // generate empty map for next state
      newTemplate.init(width, height);
      newTemplate.create();

      for (let j = 0; j < height; j += 1) {
        for (let k = 0; k < width; k += 1) {
          const neighbors = template.neighbors(j, k, tile => tile.name === 'wall').length;

          if (neighbors >= WALL_EVOLUTION) {
            // more than x neighbors creates a new wall (doesn't matter if it's already a wall)
            newTemplate.set(j, k, 'wall');
          } else if (neighbors <= WALL_STARVE) {
            // less than x neighbors makes a wall die (doesn't matter if it's already a floor)
            newTemplate.set(j, k, 'floor');
          } else if (neighbors === 2 || neighbors === 3) {
            // 2 or 3 neighbors revive a floor and turn it into a wall
            newTemplate.set(j, k, 'wall');
          } else {
            newTemplate.set(j, k, 'floor');
          }
        }
      }

      template = newTemplate; // next iteration runs on newly created map state
    }

    // surround map with walls
    for (let i = 0; i < template.height; i += 1) {
      for (let j = 0; j < template.width; j += 1) {
        if (i === 0 || i === (template.height - 1) || j === 0 || j === (template.width - 1)) {
          template.set(i, j, 'wall');
        }
      }
    }

    return template;
  };
}());
