/* The Cellular Automaton works just like any CA does. Tweaking the constants
   should only happen carefully here because changes can have wild effects on
   the generated maps. In general, the algorithm provides great variety with
   the same set of parameters, so a runtime tweaking doesn't make sense. */

const mapHelpers = require('./mapHelpers');

module.exports = (function cellularAutomaton() {
  const WALL_CHANCE = 0.5; // the chance of a wall placement in the initial setup
  const ITERATIONS = 3; // the number of times the CA algorithm runs
  const WALL_EVOLUTION = 5; // the number of neighbor walls to form a new wall
  const WALL_STARVE = 2; // the minimum number of neighbor walls to keep a wall alive

  function createMap(width, height, empty = true) {
    /*  creates a two-dimensional array with the dimension height x width
          if empty is true, all array elements are {type: floor}
          else, random distribution of {type: floor/wall} according to WALL_CHANCE */
    let map = new Array(height).fill(0);
    map = map.map(() => new Array(width).fill(0).map(() => {
      if (empty) return { type: 'floor' };
      return Math.random() > WALL_CHANCE ? { type: 'floor' } : { type: 'wall' };
    }));

    map.width = width;
    map.height = height;

    return map;
  }

  function countNeighbors(x, y, map) {
    /* looks at all 8 neighbor positions (up/down, left/right), diagonal) and
       determines the amount of 'living' (floor) tiles by looking at map array */
    const ADJACENT = [
      [-1, -1], [0, -1], [1, -1],
      [-1, 0], [1, 0],
      [-1, 1], [0, 1], [1, 1],
    ];

    return ADJACENT.reduce((count, neighbor) => {
      const [checkX, checkY] = [neighbor[0] + x, neighbor[1] + y];
      if (checkX < 0 || checkX >= map.length || checkY < 0 || checkY >= map[0].length) {
        return count; // handle out of bounds indices
      }
      if (map[checkX][checkY].type === 'wall') return count + 1;
      return count;
    }, 0);
  }

  function surroundWithWalls(map) {
    // add walls to the outmost tiles to create closed map
    for (let i = 0; i < map.height; i += 1) {
      for (let j = 0; j < map.width; j += 1) {
        if (i === 0 || i === (map.height - 1) || j === 0 || j === (map.width - 1)) {
          map[i][j].type = 'wall';
        }
      }
    }
    return map;
  }

  function setEntryandExit(map, entry) {
    let entryPoint = entry || mapHelpers.setEntry(map.width, map.height);
    let exitPoint = mapHelpers.setExit(map.width, map.height);

    map[entryPoint[0]][entryPoint[1]].type = 'floor';
    map[exitPoint[0]][exitPoint[1]].type = 'floor';

    return map;
  }

  return function generate(width, height, entry) {
    let map = createMap(width, height, false); // generate new initial map

    for (let i = 0; i < ITERATIONS; i += 1) {
      const newMap = createMap(width, height); // generate empty map to create new state to

      for (let j = 0; j < height; j += 1) {
        for (let k = 0; k < width; k += 1) {
          const neighbors = countNeighbors(j, k, map);

          if (neighbors >= WALL_EVOLUTION) {
            // more than x neighbors creates a new wall (doesn't matter if it's already a wall)
            newMap[j][k].type = 'wall';
          } else if (neighbors <= WALL_STARVE) {
            // less than x neighbors makes a wall die (doesn't matter if it's already a floor)
            newMap[j][k].type = 'floor';
          } else {
            // if 2 or three neighbors, kept alive (or remains floor anyway)
            newMap[j][k].type = (neighbors === 2 || neighbors === 3) ? map[j][k].type : 'floor';
          }
        }
      }

      map = newMap; // next iteration runs on newly created map state
    }

    map = surroundWithWalls(map);
    map = setEntryandExit(map, entry);

    return map;
  };
}());
