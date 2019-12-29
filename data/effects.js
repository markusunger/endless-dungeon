/*
  data for all effect types

  duration: amount of updates to exist
  speed: ms before next animation step
  animation: object with a states array, defining all the animation
             steps, together with key-value-pairs for the style notion
             used in the arrays

  all effects animations need to have an area of effect that is centerable,
  meaning that the length and height of the provided states need to be odd numbers,
  additionally, length and height need to be identical
*/

module.exports = {
  wisp: {
    name: 'wisp',
    duration: 5,
    speed: 250,
    animation: {
      states: [
        [
          [0, 0, 0],
          [0, 2, 0],
          [0, 0, 0],
        ],
        [
          [0, 2, 0],
          [2, 1, 2],
          [0, 2, 0],
        ],
        [
          [2, 0, 2],
          [2, 2, 2],
          [2, 0, 2],
        ],
        [
          [0, 2, 0],
          [2, 1, 2],
          [0, 2, 0],
        ],
        [
          [2, 0, 0],
          [0, 1, 0],
          [0, 0, 2],
        ],
      ],
      0: null,
      1: 'wisp1',
      2: 'wisp2',
    },
  },

  explosion: {
    name: 'explosion',
    duration: 10,
    speed: 150,
    animation: {
      states: [
        [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ],
        [
          [0, 0, 0, 0, 0],
          [0, 2, 0, 0, 0],
          [0, 0, 1, 2, 0],
          [0, 2, 2, 0, 0],
          [0, 0, 0, 0, 0],
        ],
        [
          [0, 2, 3, 3, 0],
          [0, 2, 2, 0, 0],
          [3, 3, 1, 3, 3],
          [0, 2, 2, 2, 0],
          [0, 0, 0, 3, 0],
        ],
        [
          [0, 2, 2, 3, 3],
          [0, 2, 2, 3, 0],
          [3, 2, 1, 2, 3],
          [0, 2, 2, 2, 0],
          [3, 3, 2, 3, 3],
        ],
        [
          [3, 2, 2, 3, 0],
          [3, 2, 2, 2, 3],
          [3, 2, 1, 2, 3],
          [0, 2, 2, 2, 3],
          [3, 3, 0, 3, 3],
        ],
        [
          [3, 2, 0, 3, 0],
          [0, 2, 2, 3, 3],
          [3, 3, 1, 3, 3],
          [3, 2, 3, 2, 0],
          [0, 3, 0, 3, 3],
        ],
        [
          [0, 3, 0, 0, 0],
          [0, 2, 3, 3, 0],
          [0, 3, 2, 3, 3],
          [3, 0, 3, 3, 0],
          [0, 3, 0, 0, 3],
        ],
        [
          [0, 3, 0, 0, 3],
          [0, 3, 0, 0, 0],
          [3, 0, 2, 0, 2],
          [3, 0, 0, 3, 0],
          [0, 3, 3, 0, 3],
        ],
        [
          [0, 0, 0, 0, 3],
          [0, 0, 0, 0, 0],
          [3, 0, 3, 0, 3],
          [3, 0, 0, 0, 0],
          [0, 3, 0, 0, 3],
        ],
        [
          [0, 0, 0, 0, 3],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [3, 0, 0, 0, 0],
          [0, 0, 0, 0, 3],
        ],
      ],
      0: null,
      1: 'expl1',
      2: 'expl2',
      3: 'expl3',
    },
  },

  iceshatter: {
    name: 'iceshatter',
    duration: 6,
    speed: 180,
    animation: {
      states: [
        [
          [0, 0, 0, 2, 0],
          [2, 0, 0, 0, 0],
          [0, 0, 2, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 2, 0],
        ],
        [
          [0, 0, 0, 1, 0],
          [1, 0, 0, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 1, 0],
        ],
        [
          [0, 2, 0, 0, 0],
          [0, 0, 0, 0, 2],
          [0, 0, 0, 0, 0],
          [0, 2, 0, 2, 0],
          [0, 0, 0, 0, 0],
        ],
        [
          [0, 1, 0, 0, 0],
          [0, 0, 0, 0, 1],
          [0, 0, 0, 0, 0],
          [0, 1, 0, 1, 0],
          [0, 0, 0, 0, 0],
        ],
        [
          [0, 0, 0, 0, 2],
          [0, 0, 2, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 2, 0, 0, 0],
        ],
        [
          [0, 0, 0, 0, 1],
          [0, 0, 1, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 1, 0, 0, 0],
        ],
      ],
      0: null,
      1: 'shatter1',
      2: 'shatter2',
    },
  },

  arcanestorm: {
    name: 'arcanstorm',
    duration: 7,
    speed: 160,
    animation: {
      states: [
        [
          [1, 0, 1],
          [0, 0, 0],
          [1, 0, 1],
        ],
        [
          [2, 1, 2],
          [1, 0, 1],
          [2, 1, 2],
        ],
        [
          [1, 0, 1],
          [0, 0, 0],
          [1, 0, 1],
        ],
        [
          [0, 2, 0],
          [2, 0, 2],
          [0, 2, 0],
        ],
        [
          [1, 0, 1],
          [0, 0, 0],
          [1, 0, 1],
        ],
        [
          [0, 2, 0],
          [2, 0, 2],
          [0, 2, 0],
        ],
        [
          [0, 0, 1],
          [0, 0, 0],
          [1, 0, 0],
        ],
      ],
      0: null,
      1: 'astorm1',
      2: 'astorm2',
    },
  },
};

// function r(...states) {
//   // randomize a pixel state
//   return states[(Math.floor(Math.random() * states.length))];
// }

// module.exports = {
//   wisp: {
//     duration: 6,
//     speed: 350,
//     style: ['wisp1', 'wisp2'],
//     pixels: [
//       {
//         x: 0,
//         y: 0,
//         states: [1, 0, 0, 0, 1, null],
//       },
//       {
//         x: 0,
//         y: -1,
//         states: [null, null, 1, 1, 1, null],
//       },
//       {
//         x: -1,
//         y: 0,
//         states: [null, null, 1, 1, 1, null],
//       },
//       {
//         x: 1,
//         y: 0,
//         states: [null, null, 1, 1, 1, null],
//       },
//       {
//         x: 0,
//         y: 1,
//         states: [null, null, 1, 1, 1, null],
//       },
//     ],
//   },

//   explosion: {
//     duration: 10,
//     speed: 100,
//     style: ['expl1', 'expl2', 'expl3'],
//     pixels: [
//       {
//         x: 0,
//         y: 0,
//         states: [2, 0, 0, 0, 0, 0, 0, 1, 2, null],
//       },
//       {
//         x: -1,
//         y: 0,
//         states: [null, 2, 2, r(1, 2), r(0, 1), r(1, 2), r(null, 2), r(null, 2), null],
//       },
//       {
//         x: 1,
//         y: 0,
//         states: [null, 2, 2, r(1, 2), r(1, 2), r(1, 2), r(null, 2), r(null, 2), null],
//       },
//       {
//         x: 0,
//         y: -1,
//         states: [null, 2, 2, r(1, 2), r(0, 1), r(1, 2), r(null, 2), r(null, 2), null],
//       },
//       {
//         x: 0,
//         y: 1,
//         states: [null, r(null, 2), r(null, 2), r(1, 2), r(0, 1), r(1, 2), r(null, 2), r(null, 2), null],
//       },
//       {
//         x: -1,
//         y: -1,
//         states: [null, r(null, 2), r(null, 2), r(1, 2), r(1, 2), r(0, 1), r(null, 2), r(null, 2), null],
//       },
//       {
//         x: 1,
//         y: -1,
//         states: [null, r(null, 2), r(null, 2), r(0, 1), r(1, 2), r(1, 2), r(null, 2), r(null, 2), null],
//       },
//       {
//         x: 1,
//         y: -1,
//         states: [null, r(null, 2), r(null, 2), r(0, 1), r(1, 2), r(1, 2), r(null, 2), r(null, 2), null],
//       },
//       {
//         x: 1,
//         y: 1,
//         states: [null, 2, 2, r(1, 2), r(1, 2), r(1, 2), r(null, 2), r(null, 2), null],
//       },
//       {
//         x: -2,
//         y: 0,
//         states: [null, null, 2, r(1, 2), r(1, 2), r(1, 2), r(null, 2), null, null],
//       },
//       {
//         x: 2,
//         y: 0,
//         states: [null, null, 2, r(1, 2), r(1, 2), r(1, 2), r(null, 2), null, null],
//       },
//       {
//         x: 0,
//         y: 2,
//         states: [null, null, 2, r(1, 2), r(1, 2), r(1, 2), r(null, 2), null, null],
//       },
//       {
//         x: 0,
//         y: -2,
//         states: [null, null, 2, r(1, 2), r(1, 2), r(1, 2), r(null, 2), null, null],
//       },
//     ],
//   },

//   iceshatter: {
//     duration: 8,
//     speed: 150,
//     style: ['shatter1', 'shatter2'],
//     pixels: [
//       {
//         x: 0,
//         y: 0,
//         states: [0, 1, 0, 0, 0, r(0, 1), 1, null],
//       },
//       {
//         x: -1,
//         y: -1,
//         states: [null, 1, 1, 1, r(null, 1), r(null, 1), null, null],
//       },
//       {
//         x: 1,
//         y: 1,
//         states: [null, 1, 1, 1, r(null, 1), r(null, 1), null, null],
//       },
//       {
//         x: 1,
//         y: -1,
//         states: [null, 1, 1, 1, r(null, 1), r(null, 1), null, null],
//       },
//       {
//         x: -1,
//         y: 1,
//         states: [null, 1, 1, 1, r(null, 1), r(null, 1), null, null],
//       },
//       {
//         x: -2,
//         y: -1,
//         states: [null, 1, 1, 1, r(null, 1), r(null, 1), null, null],
//       },
//       {
//         x: 2,
//         y: -2,
//         states: [null, 1, 1, 1, r(null, 1), r(null, 1), null, null],
//       },
//     ],
//   },

//   arcanestorm: {
//     duration: 8,
//     speed: 170,
//     style: ['astorm1', 'astorm2'],
//     pixels: [
//       {
//         x: 0,
//         y: 0,
//         states: [0, null, 0, null, 0, null, 0, null],
//       },
//       {
//         x: -1,
//         y: 0,
//         states: [null, 1, null, 1, null, 1, null, null],
//       },
//       {
//         x: 1,
//         y: 0,
//         states: [1, null, 1, null, 1, null, 1, null],
//       },
//       {
//         x: 0,
//         y: -1,
//         states: [null, 1, null, 1, null, 1, null, null],
//       },
//       {
//         x: 0,
//         y: 1,
//         states: [1, null, 1, null, 1, null, 1, null],
//       },
//     ],
//   },
// };
