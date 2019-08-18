const mapHelpers = require('./mapHelpers');

/* eslint-disable no-loop-func */
/* The Drunken Carver (don't know where I heard that name originally) creates a more or less
   twisted path from the provided entry point to a randomly determined exit coordinate. */

module.exports = (function DrunkenCarver() {
  const DRUNKENNESS = 0.5;
  // chance to walk in the opposite direction of where the carver should go
  const ADJACENT = [ // all adjacent tiles with relative positions (no diagonals allowed)
    [0, -1], [-1, 0], [1, 0], [0, 1],
  ];

  function createMap(width, height) {
    /*  creates a two-dimensional array with the dimension height x width
        and all tiles set to { type: wall } */
    let map = new Array(height).fill(0);
    map = map.map(() => new Array(width).fill(0).map(() => ({ type: 'wall' })));

    map.width = width;
    map.height = height;

    return map;
  }

  function determineDifference(position, exitPosition) {
    const diffX = Math.abs(position[0] - exitPosition[0]);
    const diffY = Math.abs(position[1] - exitPosition[1]);
    return [diffX, diffY];
  }

  return function generate(width, height, entry) {
    const map = createMap(width, height); // create fully walled map

    // if no entry point was provided (first level), create one randomly
    const entryPoint = entry || mapHelpers.setEntry(width, height);
    const exit = mapHelpers.setExit(width, height);
    let carver = entryPoint;

    // carve out both entry and exit point
    map[entryPoint[0]][entryPoint[1]].type = 'floor';
    map[exit[0]][exit[1]].type = 'floor';

    while (carver[0] !== exit[0] || carver[1] !== exit[1]) {
      // determine current difference in x, y between carver position and exit
      // to be able to compare them to possible new directions
      const currentDiff = determineDifference(carver, exit).reduce((acc, p) => acc + p);

      const directions = ADJACENT.filter((relativePosition) => {
        const newX = carver[0] + relativePosition[0];
        const newY = carver[1] + relativePosition[1];
        // if new direction is exit, allow it
        if (newX === exit[0] && newY === exit[1]) return true;
        // otherwise, if new direction would touch outermost wall, discard it
        if (newX <= 0 || newX >= (height - 1) || newY <= 0 || newY >= (width - 1)) return false;

        const newDiff = determineDifference([newX, newY], exit).reduce((acc, p) => acc + p);
        if (Math.random() < DRUNKENNESS) return true;
        // random directions are more unlikely but possible, normally a direction is chosen
        // where the distance to the exit decreases (or at least does not increase)
        return newDiff <= currentDiff;
      });

      // randomly pick one of the possible directions and carve the target tile out
      const newDirection = directions[Math.floor(Math.random() * directions.length)];
      carver = [carver[0] + newDirection[0], carver[1] + newDirection[1]];
      map[carver[0]][carver[1]].type = 'floor';
    }

    return map;
  };
}());
