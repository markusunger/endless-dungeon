/* eslint-disable max-len */

/*
  data for all effect types

  every effect has to end with a null state for
  proper map state resetting
*/

function r(...states) {
  // randomize a pixel state
  return states[(Math.floor(Math.random() * states.length))];
}

module.exports = {
  wisp: {
    duration: 6,
    speed: 170,
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

  explosion: {
    duration: 10,
    speed: 60,
    zLevel: 90,
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
        states: [null, 2, 2, r(1, 2), r(1, 2), r(1, 2), r(null, 2), r(null, 2), null],
      },
      {
        x: 1,
        y: 0,
        states: [null, 2, 2, r(1, 2), r(1, 2), r(1, 2), r(null, 2), r(null, 2), null],
      },
      {
        x: 0,
        y: -1,
        states: [null, 2, 2, r(1, 2), r(1, 2), r(1, 2), r(null, 2), r(null, 2), null],
      },
      {
        x: 0,
        y: 1,
        states: [null, r(null, 2), r(null, 2), r(1, 2), r(1, 2), r(1, 2), r(null, 2), r(null, 2), null],
      },
      {
        x: -1,
        y: -1,
        states: [null, r(null, 2), r(null, 2), r(1, 2), r(1, 2), r(1, 2), r(null, 2), r(null, 2), null],
      },
      {
        x: 1,
        y: -1,
        states: [null, r(null, 2), r(null, 2), r(1, 2), r(1, 2), r(1, 2), r(null, 2), r(null, 2), null],
      },
      {
        x: 1,
        y: -1,
        states: [null, r(null, 2), r(null, 2), r(1, 2), r(1, 2), r(1, 2), r(null, 2), r(null, 2), null],
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
};
