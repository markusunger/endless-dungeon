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
    speed: 800,
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
};
