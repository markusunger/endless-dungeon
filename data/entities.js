/*
  data for all entity types

    speed: ms before a move or action is made
    static: does not need to move or act
    animated: periodically switch between certain styles
              false (no animation) or ms between animation
    style: tile style(s)
*/

module.exports = {
  player: {
    name: 'player',
    speed: 400,
    static: false,
    animated: false,
    style: ['player'],
  },
  enemy1: {
    name: 'enemy1',
    speed: 1200,
    static: false,
    animated: false,
    style: ['enemy1'],
  },
  enemy2: {
    name: 'enemy2',
    speed: 1200,
    static: false,
    animated: false,
    style: ['enemy2'],
  },
  enemy3: {
    name: 'enemy3',
    speed: 1200,
    static: false,
    animated: false,
    style: ['enemy3'],
  },
  firebolt: {
    name: 'firebolt',
    speed: 300,
    static: false,
    animated: true,
    style: ['firebolt1', 'firebolt2'],
  },
  arcanebolt: {
    name: 'arcanebolt',
    speed: 250,
    static: false,
    animated: false,
    style: ['arcanebolt'],
  },
  icebolt: {
    name: 'icebolt',
    speed: 350,
    static: false,
    animated: true,
    style: ['icebolt1', 'icebolt2'],
  },
  druidbolt: {
    name: 'druidbolt',
    speed: 225,
    static: false,
    animated: true,
    style: ['nature1', 'nature2'],
  },
  water: {
    name: 'water',
    speed: 100,
    static: true,
    animated: true,
    style: ['water1', 'water2'],
  },
  lava: {
    name: 'lava',
    speed: 150,
    static: true,
    animated: true,
    style: ['lava1', 'lava2', 'lava3'],
  },
  gold: {
    name: 'gold',
    speed: 1000,
    static: true,
    animated: true,
    style: ['gold1', 'gold2'],
  },
};
