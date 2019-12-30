/*
  data for all prefabs
*/

module.exports = {
  pool: {
    name: 'pool',
    type: ['automaton'],
    map: [
      [0, 0, 0, 0],
      [0, 1, 2, 0],
      [0, 2, 1, 0],
      [0, 0, 0, 0],
    ],
    lookup: [
      null,
      { type: 'entity', name: 'water' },
      [
        null,
        { type: 'entity', name: 'water' },
      ],
    ],
  },

  lavalake: {
    name: 'lavalake',
    type: ['automaton'],
    map: [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 2, 2, 2, 2, 2, 0],
      [0, 2, 1, 1, 1, 2, 0],
      [0, 0, 1, 1, 1, 2, 0],
      [0, 2, 1, 1, 1, 2, 0],
      [0, 2, 2, 1, 1, 1, 0],
      [0, 2, 2, 2, 2, 2, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ],
    lookup: [
      null,
      { type: 'entity', name: 'lava' },
      [
        null,
        { type: 'entity', name: 'lava' },
      ],
    ],
  },

  magicchamber: {
    name: 'magicchamber',
    type: ['drunken'],
    map: [
      [0, 4, 4, 4, 0, 4],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 2, 3, 0, 4],
      [4, 0, 3, 2, 0, 4],
      [4, 0, 0, 0, 0, 4],
      [4, 0, 4, 4, 4, 4],
    ],
    lookup: [
      null,
      { type: 'tile', name: 'wall1' },
      { type: 'tile', name: 'wood1' },
      { type: 'tile', name: 'wood2' },
      [
        null,
        { type: 'tile', name: 'wall1' },
      ],
    ],
  },

  goldchamber: {
    name: 'goldchamber',
    type: ['drunken'],
    map: [
      [0, 0, 3, 3, 3, 3, 1],
      [0, 0, 4, 4, 2, 2, 3],
      [0, 4, 4, 4, 2, 2, 3],
      [0, 0, 4, 4, 4, 3, 3],
      [0, 0, 0, 0, 0, 0, 0],
    ],
    lookup: [
      null,
      { type: 'tile', name: 'wall1' },
      { type: 'entity', name: 'gold' },
      [
        null,
        { type: 'tile', name: 'wall1' },
        { type: 'entity', name: 'gold' },
      ],
      [
        null,
        { type: 'entity', name: 'gold' },
      ],
    ],
  },

  deadend: {
    name: 'deadend',
    type: ['drunken'],
    map: [
      [0, 2],
      [2, 1],
    ],
    lookup: [
      null,
      { type: 'tile', name: 'rock1' },
      { type: 'tile', name: 'rock2' },
    ],
  },
};
