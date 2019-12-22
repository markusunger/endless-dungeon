const mapGenerator = require('./mapGenerator');
const effectGenerator = require('./effect');

module.exports = (function levelGenerator() {

  return {
    init: function init() {
      this.map = mapGenerator();
      this.mapState = mapGenerator();
      this.effects = [];
    },

    addEffect: function addEffect(type, x, y) {
      const newEffect = Object.create(effectGenerator);
      newEffect.init(type, x, y);
      this.effects.push(newEffect);
    },

    state: function state() {
      return this.mapState;
    },

    update: function update(timePassed) {
      // check if map state has changed
      let updateNecessary;

      // add random wisp effect
      if (Math.random() * 100 > 80) {
        const [x, y] = this.map.randomWalkableTile();
        this.addEffect('explosion', x, y);
      }

      // update any effect states
      this.effects.forEach((effect, idx) => {
        if (effect.config.speed < timePassed) {
          const affected = effect.animate();
          if (affected) {
            updateNecessary = true;
            affected.forEach((tile) => {
              if (tile.style && this.map.overlayableAt(tile.x, tile.y)) {
                this.mapState.set(tile.x, tile.y, { type: tile.style });
              } else {
                this.mapState.set(tile.x, tile.y, this.map.at(tile.x, tile.y));
              }
            });
          } else {
            this.effects.splice(idx, 1);
          }
        }
      });
      return updateNecessary;
    },
  };
}());
