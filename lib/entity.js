/*
  base object for an entity in the level
*/

const entities = require('../data/entities');

module.exports = (function entity() {
  return {
    init: function init(type, x, y, targetX = x, targetY = y) {
      this.config = entities[type];
      this.coords = [x, y];
      this.target = [targetX, targetY];
      this.stylePointer = 0;
    },

    currentStyle: function currentStyle() {
      if (this.config.animated) {
        const ptr = this.stylePointer;
        const styles = this.config.style;

        this.stylePointer = styles.length <= ptr + 1 ? 0 : ptr + 1;
        return this.config.style[this.stylePointer];
      }
      return this.config.style[0];
    },
  };
}());
