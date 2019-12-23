/*
  data for all entity types

    speed: ms before a move or action is made
    static: does not need to move or act
    animated: periodically switch between certain styles
              false (no animation) or ms between animation
    zLevel: display level
    style: tile style(s)
*/

module.exports = {
  player: {
    name: 'player',
    speed: 500,
    static: false,
    animated: false,
    zLevel: 98,
    style: ['player'],
  },
};
