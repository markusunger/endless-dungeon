/* eslint-disable no-param-reassign */
/*
  several mutating methods for map creation and improvement

  yeah, it directly manipulates the map object, so be careful
  (there's probably a reason why ESLint complains about param reassignment)
*/

module.exports = {
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

  randomizeWalls(map) {
    map.every((tile, x, y) => {
      if (tile.type === 'wall') {
        const style = `wall${Math.ceil(Math.random() * 3)}`;
        map.set(x, y, style);
      }
    });
  },
};
