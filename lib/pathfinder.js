/*
  the pathfinder for now does a simple BFS from the specified tile
  and provides paths and distances to all other tiles
*/

module.exports = (function pathfinder() {
  return {
    init: function init(map) {
      this.map = map;
      return this;
    },

    run: function run(rootX, rootY) {
      const root = [rootX, rootY];
      const explore = [];
      const paths = {};

      explore.push(root);
      paths[root.join(',')] = {
        distance: 0,
        pathTo: [],
      };

      while (explore.length > 0) {
        const current = explore.shift();
        const neighbors = this.map.neighbors(...current, tile => tile.walkable);
        neighbors.forEach((neighbor) => {
          if (!paths[neighbor.join(',')]) {
            explore.push(neighbor);
            const currentPath = paths[current.join(',')];
            paths[neighbor.join(',')] = {
              distance: currentPath.distance + 1,
              pathTo: currentPath.pathTo.concat([current]),
            };
          }
        });
      }

      return paths;
    },
  };
}());
