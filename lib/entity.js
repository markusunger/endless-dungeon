/*
  base object for an entity in the level
*/

const entities = require('../data/entities');

module.exports = (function entity() {
  return {
    init: function init(type, x, y, target = [x, y]) {
      this.config = entities[type];
      this.coords = [x, y];
      this.target = target;
      this.stylePointer = Math.floor(Math.random() * this.config.style.length);
    },

    currentStyle: function currentStyle() {
      return this.config.style[0];
    },

    nextStyle: function nextStyle() {
      const styles = this.config.style;
      this.stylePointer = this.stylePointer + 1 >= styles.length ? 0 : this.stylePointer + 1;
    },
  };
}());
