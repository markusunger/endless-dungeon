/*
  base object for an effect
*/

const effects = require('../data/effects');

module.exports = (function effect() {
  return {
    init: function init(type, x, y) {
      this.config = effects[type];
      this.origin = [x, y];
      this.time = 0;
    },

    animate: function animate() {
      if (this.time >= this.duration) return null;
      const state = this.config.pixels.map((pixel) => {
        const style = this.config.style[pixel.states[this.time]];
        return {
          x: this.origin[0] + pixel.x,
          y: this.origin[1] + pixel.y,
          style,
        };
      });
      this.time += 1;
      return state;
    },
  };
}());
