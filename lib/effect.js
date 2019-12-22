/*
  base object for an effect

  every effect has to end with a null style for
  proper map state resetting
*/

const TYPES = {
  wisp: {
    duration: 6,
    speed: 120,
    zLevel: 1,
    style: ['wisp1', 'wisp2'],
    pixels: [
      {
        x: 0,
        y: 0,
        states: [1, 0, 0, 0, 1, null],
      },
      {
        x: 0,
        y: -1,
        states: [null, null, 1, 1, 1, null],
      },
      {
        x: -1,
        y: 0,
        states: [null, null, 1, 1, 1, null],
      },
      {
        x: 1,
        y: 0,
        states: [null, null, 1, 1, 1, null],
      },
      {
        x: 0,
        y: 1,
        states: [null, null, 1, 1, 1, null],
      },
    ],
  },
};

module.exports = (function effect() {
  return {
    init: function init(type, x, y) {
      this.config = TYPES[type];
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
