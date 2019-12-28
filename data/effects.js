/* eslint-disable max-len */

/*
  data for all effect types

  duration: amount of updates to exist
  speed: ms before next animation step
  style: tile styles
  pixels: array of relative tiles affected over duration,
          x: relative x position
          y: relative y position
          states: tile style reference for each animation step

  every pixel state array has to end with a null state for
  proper map state resetting
*/

function r(...states) {
  // randomize a pixel state
  return states[(Math.floor(Math.random() * states.length))];
}

module.exports = {
  wisp: {
    duration: 6,
    speed: 450,
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

  explosion: {
    duration: 10,
    speed: 150,
    style: ['expl1', 'expl2', 'expl3'],
    pixels: [
      {
        x: 0,
        y: 0,
        states: [2, 0, 0, 0, 0, 0, 0, 1, 2, null],
      },
      {
        x: -1,
        y: 0,
        states: [null, 2, 2, r(1, 2), r(0, 1), r(1, 2), r(null, 2), r(null, 2), null],
      },
      {
        x: 1,
        y: 0,
        states: [null, 2, 2, r(1, 2), r(1, 2), r(1, 2), r(null, 2), r(null, 2), null],
      },
      {
        x: 0,
        y: -1,
        states: [null, 2, 2, r(1, 2), r(0, 1), r(1, 2), r(null, 2), r(null, 2), null],
      },
      {
        x: 0,
        y: 1,
        states: [null, r(null, 2), r(null, 2), r(1, 2), r(0, 1), r(1, 2), r(null, 2), r(null, 2), null],
      },
      {
        x: -1,
        y: -1,
        states: [null, r(null, 2), r(null, 2), r(1, 2), r(1, 2), r(0, 1), r(null, 2), r(null, 2), null],
      },
      {
        x: 1,
        y: -1,
        states: [null, r(null, 2), r(null, 2), r(0, 1), r(1, 2), r(1, 2), r(null, 2), r(null, 2), null],
      },
      {
        x: 1,
        y: -1,
        states: [null, r(null, 2), r(null, 2), r(0, 1), r(1, 2), r(1, 2), r(null, 2), r(null, 2), null],
      },
      {
        x: 1,
        y: 1,
        states: [null, 2, 2, r(1, 2), r(1, 2), r(1, 2), r(null, 2), r(null, 2), null],
      },
      {
        x: -2,
        y: 0,
        states: [null, null, 2, r(1, 2), r(1, 2), r(1, 2), r(null, 2), null, null],
      },
      {
        x: 2,
        y: 0,
        states: [null, null, 2, r(1, 2), r(1, 2), r(1, 2), r(null, 2), null, null],
      },
      {
        x: 0,
        y: 2,
        states: [null, null, 2, r(1, 2), r(1, 2), r(1, 2), r(null, 2), null, null],
      },
      {
        x: 0,
        y: -2,
        states: [null, null, 2, r(1, 2), r(1, 2), r(1, 2), r(null, 2), null, null],
      },
    ],
  },

  iceshatter: {
    duration: 8,
    speed: 300,
    style: ['shatter1', 'shatter2'],
    pixels: [
      {
        x: 0,
        y: 0,
        states: [0, 1, 0, 0, 0, r(0, 1), 1, null],
      },
      {
        x: -1,
        y: -1,
        states: [null, 1, 1, 1, r(null, 1), r(null, 1), null, null],
      },
      {
        x: 1,
        y: 1,
        states: [null, 1, 1, 1, r(null, 1), r(null, 1), null, null],
      },
      {
        x: 1,
        y: -1,
        states: [null, 1, 1, 1, r(null, 1), r(null, 1), null, null],
      },
      {
        x: -1,
        y: 1,
        states: [null, 1, 1, 1, r(null, 1), r(null, 1), null, null],
      },
      {
        x: -2,
        y: -1,
        states: [null, 1, 1, 1, r(null, 1), r(null, 1), null, null],
      },
      {
        x: 2,
        y: -2,
        states: [null, 1, 1, 1, r(null, 1), r(null, 1), null, null],
      },
    ],
  },

  arcanestorm: {
    duration: 8,
    speed: 350,
    style: ['astorm1', 'astorm2'],
    pixels: [
      {
        x: 0,
        y: 0,
        states: [0, null, 0, null, 0, null, 0, null],
      },
      {
        x: -1,
        y: 0,
        states: [null, 1, null, 1, null, 1, null, null],
      },
      {
        x: 1,
        y: 0,
        states: [1, null, 1, null, 1, null, 1, null],
      },
      {
        x: 0,
        y: -1,
        states: [null, 1, null, 1, null, 1, null, null],
      },
      {
        x: 0,
        y: 1,
        states: [1, null, 1, null, 1, null, 1, null],
      },
    ],
  },
};
