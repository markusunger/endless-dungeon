/*
 - creates a map from a template with valid entry and exit points
*/

const templateAutomaton = require('./maps/templateAutomaton');
const templateDrunken = require('./maps/templateDrunken');
const templateEmpty = require('./maps/templateEmpty');
const tools = require('./maps/mapTools');
// const tiles = require('./tiles');

const MAP_WIDTH = 16;
const MAP_HEIGHT = 16;
const MAX_RETRIES = 5; // maximum retries for entry/exit generation before creating new map

module.exports = (function mapGenerator() {
  function newMap(type, entry) {
    let map;

    if (type === 'automaton') {
      map = templateAutomaton(MAP_WIDTH, MAP_HEIGHT);
      // generate valid entry and exit points
      // -> should probably be moved in the template
      let validMap;
      let retries = 0;

      while (!validMap) {
        if (retries > MAX_RETRIES) {
          map = templateAutomaton(MAP_WIDTH, MAP_HEIGHT);
          retries = 0;
        }
        const entryCandidate = tools.createEntry(map, ...entry);
        const exitCandidate = tools.createExit(map);
        const path = map.pathsFrom(...entryCandidate, tile => tile.walkable)[exitCandidate.join(',')];
        if (path && path.pathTo.length > map.width / 2) {
          validMap = true;
        } else {
          map.set(...entryCandidate, 'wall1');
          map.set(...exitCandidate, 'wall1');
          retries += 1;
        }
      }
    }

    if (type === 'empty') {
      map = templateEmpty(MAP_WIDTH, MAP_HEIGHT);
    }

    if (type === 'drunken') {
      map = templateDrunken(MAP_WIDTH, MAP_HEIGHT);
    }

    map.type = type;
    return map;
  }

  return function generate({ entry = [], type = 'random' } = {}) {
    // create raw map
    const random = ['automaton', 'drunken'];
    const map = type === 'random' ? newMap(random[Math.floor(Math.random() * random.length)], entry) : newMap(type, entry);

    // randomize wall types for a better look
    tools.randomizeWalls(map);

    // add a random prefab to the map
    const entities = type !== 'empty' ? tools.addPrefab(map) : [];

    return {
      map,
      entities,
    };
  };
}());
