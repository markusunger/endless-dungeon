/* The base prototype object for a map  */

module.exports = (function mapClass() {
  function MapException(message) {
    this.message = message;
    this.name = 'MapException';
  }

  function outOfBounds(x, y) {
    return (x < 0 || x >= this.height || y < 0 || y >= this.width);
  }

  return {
    init: function init(width, height) {
      this.width = width;
      this.height = height;
    },

    create: function create() {
      this.map = new Array(this.height).fill(0);
      this.map = this.map.map(() => {
        const row = new Array(this.width);
        row.fill(0);
        return row.map(() => ({ type: 'floor' }));
      });
      return this;
    },

    at: function at(x, y) {
      if (outOfBounds(x, y)) {
        throw new MapException(`at out of bounds @ ${x}, ${y}`);
      }
      return this.map[x][y];
    },

    set: function set(x, y, props) {
      if (outOfBounds(x, y)) {
        throw new MapException(`set out of bounds @ ${x}, ${y}`);
      }
      Object.keys(props).forEach((propKey) => {
        this.map[x][y].propKey = props[propKey];
      });
    },

    fill: function fill(props) {
      for (let i = 0; i < this.height; i += 1) {
        for (let j = 0; j < this.width; j += 1) {
          this.set(i, j, props);
        }
      }
      return this;
    },

    width: function width() {
      return this.width;
    },

    height: function height() {
      return this.height;
    },
  };
}());
