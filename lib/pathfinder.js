/*
  the pathfinder for now does a simple BFS from the specified tile
  and provides paths and distances to all other tiles
*/

const Queue = require('tinyqueue');

module.exports = (function pathfinder() {
  return {
    init: function init(map) {
      this.map = map;
      return this;
    },

    runBFS: function runBFS(rootX, rootY) {
      const root = [rootX, rootY];
      const explore = [];
      const paths = {};

      explore.push(root);
      paths[root.join(',')] = {
        distance: 0,
        pathTo: [root],
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

    runAStar: function runDFS(rootX, rootY, targetX, targetY) {
      function manhattanDist(origin, target) {
        return Math.abs(origin[0] - target[0]) + Math.abs(origin[1] - target[1]);
      }

      const target = [targetX, targetY];
      const root = [rootX, rootY];
      const explore = new Queue([], (a, b) => a.cost - b.cost);
      const paths = {};

      explore.push({ coords: root, cost: 0 });
      paths[root.join(',')] = {
        distance: 0,
        pathTo: [root],
      };

      while (explore.length > 0) {
        const current = explore.pop();
        if (current.coords[0] === targetX && current.coords[1] === targetY) break;
        const neighbors = this.map.neighbors(...current.coords, tile => tile.walkable);

        neighbors.forEach((neighbor) => {
          const newCost = manhattanDist(target, neighbor);
          if (!paths[neighbor.join(',')] || newCost < paths[neighbor.join(',')]) {
            explore.push({ coords: neighbor, cost: newCost });
            const currentPath = paths[current.coords.join(',')];
            paths[neighbor.join(',')] = {
              distance: currentPath.distance + 1,
              pathTo: currentPath.pathTo.concat([neighbor]),
            };
          }
        });
      }

      return paths[target.join(',')];
    },
  };
}());
