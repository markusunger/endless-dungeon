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
