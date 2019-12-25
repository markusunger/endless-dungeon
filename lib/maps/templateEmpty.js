const map = require('./mapObject');

module.exports = (function templateEmpty() {
  return function createEmpty(width, height) {
    const template = Object.create(map);

    template.init(width, height);
    template.create().fill('floor');

    // surround map with walls
    for (let i = 0; i < template.height; i += 1) {
      for (let j = 0; j < template.width; j += 1) {
        if (i === 0 || i === (template.height - 1) || j === 0 || j === (template.width - 1)) {
          template.set(i, j, 'wall1');
        }
      }
    }

    return template;
  };
}());
