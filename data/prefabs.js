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
};
