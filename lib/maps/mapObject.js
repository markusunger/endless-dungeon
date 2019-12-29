/* The base prototype object for a map, includes pathfinding */

const tiles = require('../../data/tiles.js');
const pathfinder = require('../pathfinder');

module.exports = (function mapClass() {
  return {
    init: function init(width, height) {
      this.width = width;
      this.height = height;
      this.entry = undefined;
      this.exit = undefined;
    },

    create: function create() {
      // creates empty map with only floor tiles
      this.map = new Array(this.height).fill(0);
      this.map = this.map.map(() => {
        const row = new Array(this.width);
        row.fill(0);
        return row.map(() => tiles.floor);
      });
      return this;
    },

    outOfBounds: function outOfBounds(x, y) {
      // check if a position is inside the width and height
      // and check for NaN because god knows how that gets there sometimes
      if (Number.isNaN(x) || Number.isNaN(y)) return true;
      return (x < 0 || x >= this.height || y < 0 || y >= this.width);
    },

    at: function at(x, y) {
      // returns property object of the tile at a position
      if (!this.outOfBounds(x, y)) return this.map[x][y];
      return tiles.wall1;
    },

    randomWalkableTile: function randomWalkableTile() {
      // finds one random floor tile
      let tile;
      while (!tile) {
        const x = Math.floor(Math.random() * this.height);
        const y = Math.floor(Math.random() * this.width);
        if (this.at(x, y).walkable) tile = [x, y];
      }
      return tile;
    },

    randomTile: function randomTile() {
      // finds one random tile
      return [
        Math.floor(Math.random() * this.height),
        Math.floor(Math.random() * this.width),
      ];
    },

    set: function set(x, y, tile) {
      // sets a specific tile to a specific position
      if (!this.outOfBounds(x, y) && tiles[tile]) this.map[x][y] = tiles[tile];
    },

    fill: function fill(tile) {
      // sets all map tiles to a specific tile
      for (let i = 0; i < this.height; i += 1) {
        for (let j = 0; j < this.width; j += 1) {
          this.set(i, j, tile);
        }
      }
      return this;
    },

    copy: function copy(oldMap) {
      // copies map state from another map object of the same size
      if (this.width !== oldMap.width || this.height !== oldMap.height) {
        return false;
      }
      for (let i = 0; i < this.height; i += 1) {
        for (let j = 0; j < this.width; j += 1) {
          this.set(i, j, oldMap.at(i, j).name);
        }
      }
      return this;
    },

    every: function every(cb) {
      // pass every map tile to the callback function
      // callback args: tile, x, y
      for (let i = 0; i < this.height; i += 1) {
        for (let j = 0; j < this.width; j += 1) {
          cb(this.at(i, j), i, j);
        }
      }
    },

    neighbors: function neighbors(x, y, cb) {
      // TODO: make it return the neighbors themselves, not just the count
      /* looks at all 8 neighbor positions (up/down, left/right), diagonal) and
         determines the number of tiles that satisfy the passed function by returning true */
      const ADJACENT = [
        [-1, 0], [0, -1], [1, 0],
        [0, 1], [-1, -1], [1, -1],
        [-1, 1], [1, 1],
      ];

      return ADJACENT.reduce((result, neighbor) => {
        const [checkX, checkY] = [neighbor[0] + x, neighbor[1] + y];
        if (this.outOfBounds(checkX, checkY)) {
          return result; // handle out of bounds indices and treat them as non-neighbors
        }
        if (cb(this.at(checkX, checkY))) result.push([checkX, checkY]);
        return result;
      }, []);
    },

    // pathfinding-related methods

    pathsFrom: function pathsFrom(x, y, cb) {
      const pf = Object.create(pathfinder);
      return pf.init(this).runBFS(x, y, cb);
    },

    pathTo: function pathto(x, y, targetX, targetY) {
      const pf = Object.create(pathfinder);
      return pf.init(this).runAStar(x, y, targetX, targetY);
    },
  };
}());
