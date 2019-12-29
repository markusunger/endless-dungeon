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
      // increase time pointer, return false if effect duration is over
      if (this.time >= this.config.duration) return false;
      this.time += 1;
      return true;
    },

    getState: function getState() {
      // map animation object to absolute coordinates for usage on the map state
      const { animation } = this.config;
      const { states } = animation;

      const animationState = states[this.time];
      if (!animationState) return false;

      const effectPixels = animationState.reduce((pixels, row, x) => {
        const rowPixels = row.reduce((pxls, tile, y) => {
          const center = Math.floor(row.length / 2);
          pxls.push({
            x: this.origin[0] + x - center,
            y: this.origin[1] + y - center,
            style: animation[tile],
          });
          return pxls;
        }, []);
        return pixels.concat(rowPixels);
      }, []);

      return effectPixels;
    },
  };
}());
