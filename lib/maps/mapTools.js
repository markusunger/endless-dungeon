/* eslint-disable no-param-reassign */
/*
  several mutating methods for map creation and improvement

  yeah, it directly manipulates the map object, so be careful
  (there's probably a reason why ESLint complains about param reassignment)
*/

const prefabs = require('../../data/prefabs');

module.exports = (function mapTools() {
  // allowed prefabs
  const PRE_LIST = [
    'pool', 'lavalake', 'magicchamber', 'goldchamber', 'deadend',
  ];

  return {
    createEntry: function createEntry(map, x, y) {
      // creates an entry floor tile on the map
      if (x && y) {
        map.entry = [x, y];
        map.set(x, y, 'floor');
        return [x, y];
      }

      // if no coordinates given, determine random position
      let entryX;
      let entryY;
      if (Math.random() >= 0.5) { // entry on bottom
        entryX = map.height - 1;
        entryY = Math.ceil(Math.random() * (map.width - 2));
      } else { // entry on left
        entryX = Math.ceil(Math.random() * (map.height - 2));
        entryY = 0;
      }

      map.entry = [entryX, entryY];
      map.set(entryX, entryY, 'floor');
      return map.entry;
    },

    createExit: function createExit(map) {
      // determines a random exit position
      let exitX;
      let exitY;
      if (Math.random() >= 0.5) { // exit on top
        exitX = 0;
        exitY = Math.ceil(Math.random() * (map.width - 2));
      } else { // exit on right
        exitX = Math.ceil(Math.random() * (map.height - 2));
        exitY = map.width - 1;
      }

      map.exit = [exitX, exitY];
      map.set(exitX, exitY, 'floor');
      return map.exit;
    },

    randomizeWalls: function randomizeWalls(map) {
      // changes all wall tiles to a random one (wall1, wall2 or wall3)
      // ESLint getting confused by my custom every method
      // eslint-disable-next-line array-callback-return
      map.every((tile, x, y) => {
        if (tile.type === 'wall') {
          const style = `wall${Math.ceil(Math.random() * 3)}`;
          map.set(x, y, style);
        }
      });
    },

    findSpace: function findSpace(map, width, height, type) {
      // tries to find the required space for a prefab placement, depending
      // on the type of prefab (for drunken carver or automaton maps)

      const MAX_PLACEMENT_TRIES = 25; // maximum tries to find room for prefab

      let placed;
      let origin;
      let placementTries = 0;

      while (!placed) {
        origin = type === 'drunken' ? map.randomWallTile() : map.randomTile();
        if (origin[0] + width < map.height - 1 && origin[1] + height < map.width - 1
          && origin[0] > 0 && origin[1] > 0) {
          if (!type === 'drunken') return origin;
          let allFit = true;
          for (let x = origin[0]; x < origin[0] + width; x += 1) {
            for (let y = origin[1]; y < origin[1] + height; y += 1) {
              const atXY = map.at(x, y);
              if (type === 'drunken' && atXY.type !== 'wall') allFit = false;
            }
          }
          if (allFit) placed = true;
        }

        // return null if no placement was successful
        placementTries += 1;
        if (placementTries > MAX_PLACEMENT_TRIES) return null;
      }

      return origin;
    },

    connect: function connect(map, x, y) {
      // connects a tile (specified by x and y) to the main level path
      // if necessary
      const isConnected = map.pathsFrom(x, y, tile => tile.walkable);
      if (isConnected[map.exit.join(',')]) return true;
      const paths = map.pathsFrom(x, y, () => true);
      // eslint-disable-next-line no-restricted-syntax
      for (const [coords, path] of Object.entries(paths)) {
        if (map.at(...coords.split(',')).walkable && !isConnected[coords]) {
          path.pathTo.forEach((coord) => {
            if (!map.at(...coord).walkable && !map.borderTile(...coord)) {
              map.set(...coord, 'floor');
              map
                .neighbors(...coord, tile => tile.type === 'wall')
                .filter(neighbor => !map.borderTile(...neighbor))
                .forEach(neighbor => map.set(...neighbor, 'floor'));
            }
          });
          return true;
        }
      }
      return true;
    },

    addPrefab: function addPrefab(map) {
      // adds a random prefab that fits into the map and matches the map type
      const prefabList = PRE_LIST.filter(pf => prefabs[pf].type.includes(map.type));

      while (true) {
        const prefabName = prefabList[Math.floor(Math.random() * prefabList.length)];
        const prefab = prefabs[prefabName];

        const origin = this.findSpace(map, prefab.map[0].length, prefab.map.length, map.type);

        if (origin) {
          const newEntities = prefab.map.reduce((entities, row, y) => {
            row.forEach((tile, x) => {
              const toPlace = prefab.lookup[tile];
              const newX = origin[0] + x;
              const newY = origin[1] + y;
              if (toPlace) {
                if (toPlace.type === 'entity') {
                  map.set(newX, newY, 'floor');
                  entities.push([toPlace.name, newX, newY]);
                } else if (toPlace.type === 'tile') {
                  map.set(newX, newY, toPlace.name);
                }
              } else {
                map.set(newX, newY, 'floor');
              }
            });
            return entities;
          }, []);
          this.connect(map, ...origin);
          return newEntities;
        }
      }
    },
  };
}());
