/*
  data for all tiles

  - name: holds the key, a unique identifier
  - type: the type of tile to use for identifying all styles of a specific tile
  - walkable: a boolean denoting if a player/enemy can walk over this tile
  - zLevel: the z-axis position of that tile, used for rendering overlaying tiles
  - symbol: the ASCII symbolto use in the debugging console mode
  - color: the color used on the Unicorn hat display

*/

module.exports = {
  /*
  ----------------
  basic map tiles
  ----------------
  */
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
    color: [50, 40, 20],
  },
  wall2: {
    name: 'wall2',
    type: 'wall',
    walkable: false,
    zLevel: 99,
    symbol: '#',
    color: [45, 35, 25],
  },
  wall3: {
    name: 'wall3',
    type: 'wall',
    walkable: false,
    zLevel: 99,
    symbol: '#',
    color: [60, 40, 25],
  },

  /*
  -------------------
  actor entity tiles
  -------------------
  */
  player: {
    name: 'player',
    type: 'player',
    walkable: true,
    zLevel: 98,
    symbol: '@',
    color: [200, 0, 150],
  },
  enemy1: {
    name: 'enemy1',
    type: 'enemy',
    walkable: true,
    zLevel: 97,
    symbol: 'W',
    color: [150, 0, 0],
  },
  enemy2: {
    name: 'enemy2',
    type: 'enemy',
    walkable: true,
    zLevel: 97,
    symbol: 'W',
    color: [170, 5, 0],
  },
  enemy3: {
    name: 'enemy3',
    type: 'enemy',
    walkable: true,
    zLevel: 97,
    symbol: 'W',
    color: [100, 0, 0],
  },

  /*
  -------------
  effect tiles
  -------------
  */
  wisp1: {
    name: 'wisp1',
    type: 'effect',
    walkable: true,
    zLevel: 70,
    symbol: 'O',
    color: [5, 30, 10],
  },
  wisp2: {
    name: 'wisp2',
    type: 'effect',
    walkable: true,
    zLevel: 70,
    symbol: 'o',
    color: [0, 10, 5],
  },
  expl1: {
    name: 'expl1',
    type: 'effect',
    walkable: true,
    zLevel: 80,
    symbol: 'X',
    color: [180, 0, 0],
  },
  expl2: {
    name: 'expl2',
    type: 'effect',
    walkable: true,
    zLevel: 80,
    symbol: 'x',
    color: [100, 20, 0],
  },
  expl3: {
    name: 'expl3',
    type: 'effect',
    walkable: true,
    zLevel: 80,
    symbol: '_',
    color: [100, 10, 0],
  },
  shatter1: {
    name: 'shatter1',
    type: 'effect',
    walkable: true,
    zLevel: 80,
    symbol: 'c',
    color: [150, 150, 170],
  },
  shatter2: {
    name: 'shatter2',
    type: 'effect',
    walkable: true,
    zLevel: 80,
    symbol: 'C',
    color: [170, 170, 180],
  },
  astorm1: {
    name: 'astorm1',
    type: 'effect',
    walkable: true,
    zLevel: 80,
    symbol: 'u',
    color: [140, 30, 140],
  },
  astorm2: {
    name: 'astorm2',
    type: 'effect',
    walkable: true,
    zLevel: 80,
    symbol: 'U',
    color: [140, 100, 140],
  },
  heart1: {
    name: 'heart1',
    type: 'effect',
    walkable: true,
    zLevel: 80,
    symbol: 'v',
    color: [70, 0, 0],
  },
  heart2: {
    name: 'heart2',
    type: 'effect',
    walkable: true,
    zLevel: 80,
    symbol: 'v',
    color: [25, 0, 0],
  },
  nature1: {
    name: 'nature1',
    type: 'effect',
    walkable: true,
    zLevel: 80,
    symbol: '&',
    color: [0, 60, 0],
  },
  nature2: {
    name: 'nature2',
    type: 'effect',
    walkable: true,
    zLevel: 80,
    symbol: '&',
    color: [0, 75, 0],
  },
  nature3: {
    name: 'nature3',
    type: 'effect',
    walkable: true,
    zLevel: 80,
    symbol: '&',
    color: [0, 65, 10],
  },

  /*
    -----------------
    projectile tiles
    -----------------
  */
  firebolt1: {
    name: 'firebolt1',
    type: 'projectile',
    walkable: true,
    zLevel: 80,
    symbol: '+',
    color: [155, 15, 0],
  },
  firebolt2: {
    name: 'firebolt2',
    type: 'projectile',
    walkable: true,
    zLevel: 80,
    symbol: '+',
    color: [155, 10, 0],
  },
  arcanebolt: {
    name: 'arcanebolt',
    type: 'projectile',
    walkable: true,
    zLevel: 80,
    symbol: '*',
    color: [70, 10, 70],
  },
  icebolt1: {
    name: 'icebolt1',
    type: 'projectile',
    walkable: true,
    zLevel: 80,
    symbol: '%',
    color: [40, 40, 80],
  },
  icebolt2: {
    name: 'icebolt2',
    type: 'projectile',
    walkable: true,
    zLevel: 80,
    symbol: '%',
    color: [20, 20, 90],
  },

  /*
  ----------------------
  prefab-specific tiles
  ----------------------
  */
  water1: {
    name: 'water1',
    type: 'static',
    walkable: false,
    zLevel: 20,
    symbol: '~',
    color: [0, 0, 150],
  },
  water2: {
    name: 'water2',
    type: 'static',
    walkable: false,
    zLevel: 20,
    symbol: '~',
    color: [0, 0, 130],
  },
  lava1: {
    name: 'lava1',
    type: 'static',
    walkable: false,
    zLevel: 20,
    symbol: 'L',
    color: [50, 10, 0],
  },
  lava2: {
    name: 'lava2',
    type: 'static',
    walkable: false,
    zLevel: 20,
    symbol: 'L',
    color: [50, 5, 0],
  },
  lava3: {
    name: 'lava3',
    type: 'static',
    walkable: false,
    zLevel: 20,
    symbol: 'L',
    color: [50, 15, 0],
  },
  wood1: {
    name: 'wood1',
    type: 'static',
    walkable: false,
    zLevel: 30,
    symbol: '[',
    color: [35, 5, 0],
  },
  wood2: {
    name: 'wood2',
    type: 'static',
    walkable: false,
    zLevel: 30,
    symbol: ']',
    color: [55, 5, 0],
  },
  gold1: {
    name: 'gold1',
    type: 'static',
    walkable: true,
    zLevel: 20,
    symbol: '$',
    color: [100, 50, 0],
  },
  gold2: {
    name: 'gold2',
    type: 'static',
    walkable: true,
    zLevel: 20,
    symbol: '$',
    color: [150, 75, 0],
  },
  rock1: {
    name: 'rock1',
    type: 'static',
    walkable: false,
    zLevel: 90,
    symbol: '-',
    color: [15, 10, 5],
  },
  rock2: {
    name: 'rock2',
    type: 'static',
    walkable: false,
    zLevel: 90,
    symbol: '-',
    color: [10, 10, 5],
  },
};
