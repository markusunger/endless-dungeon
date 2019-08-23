/* The base prototype object for a map  */

module.exports = (function mapClass() {
  function MapException(message) {
    // custom exception to throw from this object
    this.message = message;
    this.name = 'MapException';
  }

  function outOfBounds(x, y) {
    // check if a position is inside the width and height
    return (x < 0 || x >= this.height || y < 0 || y >= this.width);
  }

  return {
    init: function init(width, height) {
      this.width = width;
      this.height = height;
    },

    create: function create() {
      // creates empty map with only floor tiles
      this.map = new Array(this.height).fill(0);
      this.map = this.map.map(() => {
        const row = new Array(this.width);
        row.fill(0);
        return row.map(() => ({ type: 'floor' }));
      });
      return this;
    },

    at: function at(x, y) {
      // returns property object of the tile at a position
      if (outOfBounds(x, y)) {
        throw new MapException(`at out of bounds @ ${x}, ${y}`);
      }
      return this.map[x][y];
    },

    set: function set(x, y, props) {
      // sets properties to the tile at a position
      if (outOfBounds(x, y)) {
        throw new MapException(`set out of bounds @ ${x}, ${y}`);
      }
      Object.keys(props).forEach((propKey) => {
        this.map[x][y][propKey] = props[propKey];
      });
    },

    fill: function fill(props) {
      // sets all tiles to certain properties
      for (let i = 0; i < this.height; i += 1) {
        for (let j = 0; j < this.width; j += 1) {
          this.set(i, j, props);
        }
      }
      return this;
    },

    findEntry: function findEntry() {
      // determines a random entry position
      let entryX;
      let entryY;
      if (Math.random() >= 0.5) { // entry on bottom
        entryX = this.height - 1;
        entryY = Math.ceil(Math.random() * (this.width - 2));
      } else { // entry on left
        entryX = Math.ceil(Math.random() * (this.height - 2));
        entryY = 0;
      }

      this.entry = [entryX, entryY];
      return this.entry;
    },

    findExit: function findExit() {
      // determines a random exit position
      let exitX;
      let exitY;
      if (Math.random() >= 0.5) { // exit on top
        exitX = 0;
        exitY = Math.ceil(Math.random() * (this.width - 2));
      } else { // exit on right
        exitX = Math.ceil(Math.random() * (this.height - 2));
        exitY = this.width - 1;
      }

      this.exit = [exitX, exitY];
      return this.exit;
    },

    countNeighbors: function countNeighbors(x, y, countFunc) {
      /* looks at all 8 neighbor positions (up/down, left/right), diagonal) and
         determines the number of tiles that satisfy the passed function by returning true */
      const ADJACENT = [
        [-1, -1], [0, -1], [1, -1],
        [-1, 0], [1, 0],
        [-1, 1], [0, 1], [1, 1],
      ];

      return ADJACENT.reduce((count, neighbor) => {
        const [checkX, checkY] = [neighbor[0] + x, neighbor[1] + y];
        if (checkX < 0 || checkX >= this.height || checkY < 0 || checkY >= this.width) {
          return count; // handle out of bounds indices and treat them as non-neighbors
        }
        if (countFunc(this.at(checkX, checkY))) return count + 1;
        return count;
      }, 0);
    },
  };
}());
