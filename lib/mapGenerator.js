/*
 - creates a map from a template with valid entry and exit points
*/

const templateAutomaton = require('./maps/templateAutomaton');
const templateEmpty = require('./maps/templateEmpty');
const tools = require('./maps/mapTools');
// const tiles = require('./tiles');

const MAP_WIDTH = 16;
const MAP_HEIGHT = 16;
const MAX_RETRIES = 5; // maximum retries for entry/exit generation before creating new map

module.exports = (function mapGenerator() {
  function newMap(type) {
    let map;
    if (type === 'automaton') map = templateAutomaton(MAP_WIDTH, MAP_HEIGHT);
    if (type === 'empty') map = templateEmpty(MAP_WIDTH, MAP_HEIGHT);
    return map;
  }

  return function generate({ entry = [], type = 'automaton' } = {}) {
    // create raw map
    let map = newMap(type);

    // generate valid entry and exit points
    // TODO: think about whether only maps with all tiles accessible
    //       should be valid. might be more boring
    let validMap;
    let retries = 0;

    while (!validMap) {
      if (retries > MAX_RETRIES) {
        map = newMap(type);
        retries = 0;
      }
      const entryCandidate = tools.createEntry(map, ...entry);
      const exitCandidate = tools.createExit(map);
      const path = map.pathsFrom(...entryCandidate)[exitCandidate.join(',')];
      if (path && path.pathTo.length > map.width / 2) {
        validMap = true;
      } else {
        map.set(...entryCandidate, 'wall1');
        map.set(...exitCandidate, 'wall1');
        retries += 1;
      }
    }

    // randomize wall types for a better look
    tools.randomizeWalls(map);

    // TODO: include prefabs

    return map;
  };
}());
