/*
 - creates a map from a template with valid entry and exit points
*/

const templateAutomaton = require('./maps/templateAutomaton');
const templateEmpty = require('./maps/templateEmpty');
const tools = require('./maps/mapTools');
// const tiles = require('./tiles');

const MAP_WIDTH = 16;
const MAP_HEIGHT = 16;

module.exports = function generate({ entry = [], type = 'automaton' } = {}) {
  // create raw map
  let map;
  if (type === 'automaton') map = templateAutomaton(MAP_WIDTH, MAP_HEIGHT);
  if (type === 'empty') map = templateEmpty(MAP_WIDTH, MAP_HEIGHT);

  // generate valid entry and exit points
  // TODO: think about whether only maps with all tiles accessible
  //       should be valid. might be more boring
  let validMap;
  while (!validMap) {
    const entryCandidate = tools.createEntry(map, ...entry);
    const exitCandidate = tools.createExit(map);
    const path = map.pathsFrom(...entryCandidate)[exitCandidate.join(',')];
    if (path) {
      validMap = true;
    } else {
      map.set(...entryCandidate, 'wall');
      map.set(...exitCandidate, 'wall');
    }
  }

  // TODO: include prefabs

  return map;
};
