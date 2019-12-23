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
  wall: {
    name: 'wall',
    type: 'wall',
    walkable: false,
    zLevel: 99,
    symbol: '#',
    color: [230, 130, 50],
  },
  player: {
    name: 'player',
    type: 'player',
    walkable: false,
    zLevel: 98,
    symbol: '@',
    color: [250, 250, 250],
  },
  wisp1: {
    name: 'wisp1',
    type: 'effect',
    walkable: true,
    zLevel: 10,
    symbol: 'O',
    color: [5, 30, 30],
  },
  wisp2: {
    name: 'wisp2',
    type: 'effect',
    walkable: true,
    zLevel: 10,
    symbol: 'o',
    color: [5, 10, 10],
  },
  expl1: {
    name: 'expl1',
    type: 'effect',
    walkable: true,
    zLevel: 20,
    symbol: 'X',
    color: [130, 90, 0],
  },
  expl2: {
    name: 'expl2',
    type: 'effect',
    walkable: true,
    zLevel: 20,
    symbol: 'x',
    color: [100, 40, 10],
  },
  expl3: {
    name: 'expl3',
    type: 'effect',
    walkable: true,
    zLevel: 20,
    symbol: '_',
    color: [80, 0, 0],
  },
};
