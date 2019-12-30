/*
  data for all prefabs
*/

module.exports = {
  pool: {
    name: 'pool',
    type: ['automaton', 'drunken'],
    map: [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],
    lookup: [
      null,
      { type: 'entity', name: 'water' },
    ],
  },

  lavalake: {
    name: 'lavalake',
    type: ['automaton', 'drunken'],
    map: [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ],
    lookup: [
      null,
      { type: 'entity', name: 'lava' },
    ],
  },

  magicchamber: {
    name: 'magicchamber',
    type: ['drunken'],
    map: [
      [1, 1, 1, 1, 1, 1],
      [1, 1, 0, 0, 1, 1],
      [1, 0, 2, 3, 0, 1],
      [1, 0, 3, 2, 0, 1],
      [1, 1, 0, 0, 1, 1],
      [1, 1, 1, 1, 1, 1],
    ],
    lookup: [
      null,
      { type: 'tile', name: 'wall1' },
      { type: 'tile', name: 'wood1' },
      { type: 'tile', name: 'wood2' },
    ],
  },
};
