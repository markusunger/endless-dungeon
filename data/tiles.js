/*
  data for all tiles

  name equals the key, i don't seem to be able to come up with
  a better solution for self-referencing. ah well, it works
*/

module.exports = {
  floor: {
    name: 'floor',
    type: 'floor',
    walkable: true,
    zLevel: 1,
    symbol: '.',
    color: [5, 5, 5],
  },
  wall1: {
    name: 'wall1',
    type: 'wall',
    walkable: false,
    zLevel: 99,
    symbol: '#',
    color: [90, 40, 20],
  },
  wall2: {
    name: 'wall2',
    type: 'wall',
    walkable: false,
    zLevel: 99,
    symbol: '#',
    color: [80, 40, 30],
  },
  wall3: {
    name: 'wall3',
    type: 'wall',
    walkable: false,
    zLevel: 99,
    symbol: '#',
    color: [90, 50, 10],
  },
  player: {
    name: 'player',
    type: 'player',
    walkable: false,
    zLevel: 98,
    symbol: '@',
    color: [200, 50, 150],
  },
  enemy: {
    name: 'enemy',
    type: 'enemy',
    walkable: false,
    zLevel: 97,
    symbol: '~',
    color: [250, 0, 0],
  },
  wisp1: {
    name: 'wisp1',
    type: 'effect',
    walkable: true,
    zLevel: 10,
    symbol: 'O',
    color: [5, 30, 10],
  },
  wisp2: {
    name: 'wisp2',
    type: 'effect',
    walkable: true,
    zLevel: 10,
    symbol: 'o',
    color: [0, 10, 5],
  },
  expl1: {
    name: 'expl1',
    type: 'effect',
    walkable: true,
    zLevel: 20,
    symbol: 'X',
    color: [95, 5, 5],
  },
  expl2: {
    name: 'expl2',
    type: 'effect',
    walkable: true,
    zLevel: 20,
    symbol: 'x',
    color: [60, 20, 5],
  },
  expl3: {
    name: 'expl3',
    type: 'effect',
    walkable: true,
    zLevel: 20,
    symbol: '_',
    color: [40, 0, 5],
  },
};
