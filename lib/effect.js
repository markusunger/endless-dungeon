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

      return animationState.reduce((pixels, row, x) => {
        row.forEach((tile, y) => {
          const center = Math.floor(row.length / 2);
          let style = animation[tile];
          if (Array.isArray(style)) {
            style = style[Math.floor(Math.random() * style.length)];
          }
          pixels.push({
            x: this.origin[0] + x - center,
            y: this.origin[1] + y - center,
            style,
          });
        });
        return pixels;
      }, []);
    },
  };
}());
