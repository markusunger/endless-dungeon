const map = require('./mapObject');
const tools = require('./mapTools');

/* eslint-disable no-loop-func */
/* The Drunken Carver (don't know where I heard that name originally) creates a more or less
   twisted path from the provided entry point to a randomly determined exit coordinate. */

module.exports = (function DrunkenCarver() {
  const DRUNKENNESS = 0.5;
  // chance to walk in the opposite direction of where the carver should go
  const ADJACENT = [ // all adjacent tiles with relative positions (no diagonals allowed)
    [0, -1], [-1, 0], [1, 0], [0, 1],
  ];

  function determineDifference(position, exitPosition) {
    const diffX = Math.abs(position[0] - exitPosition[0]);
    const diffY = Math.abs(position[1] - exitPosition[1]);
    return [diffX, diffY].reduce((acc, p) => acc + p);
  }

  return function generate(width, height, entry) {
    const template = Object.create(map);
    template.init(width, height);
    template.create().fill('wall1'); // create fully walled map

    // create entry point
    if (entry) {
      tools.createEntry(template, ...entry);
    } else {
      tools.createEntry(template);
    }

    // create exit point with enough distance to entry to make an interesting map
    let validMap = false;
    let exitPoint = tools.createExit(template);
    while (!validMap) {
      if (determineDifference(template.entry, exitPoint) < template.height) {
        template.set(...exitPoint, 'wall1');
        exitPoint = tools.createExit(template);
      } else {
        validMap = true;
      }
    }

    let carver = template.entry;

    while (determineDifference(carver, template.exit) !== 0) {
      // determine current difference in x, y between carver position and exit
      // to be able to compare them to possible new directions
      const currentDiff = determineDifference(carver, template.exit);

      const directions = ADJACENT.filter((relativePosition) => {
        const newX = carver[0] + relativePosition[0];
        const newY = carver[1] + relativePosition[1];
        // if new direction is exit, allow it
        if (newX === exitPoint[0] && newY === exitPoint[1]) return true;
        // otherwise, if new direction would touch outermost wall, discard it
        if (newX <= 0 || newX >= (height - 1) || newY <= 0 || newY >= (width - 1)) return false;

        const newDiff = determineDifference([newX, newY], exitPoint);
        if (Math.random() < DRUNKENNESS) return true;
        // random directions are more unlikely but possible, normally a direction is chosen
        // where the distance to the exit decreases (or at least does not increase)
        return newDiff <= currentDiff;
      });

      // randomly pick one of the possible directions and carve the target tile out
      const newDirection = directions[Math.floor(Math.random() * directions.length)];
      carver = [carver[0] + newDirection[0], carver[1] + newDirection[1]];
      template.set(...carver, 'floor');
    }

    return template;
  };
}());
