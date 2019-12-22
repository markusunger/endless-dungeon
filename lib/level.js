const mapGenerator = require('./mapGenerator');
const effectGenerator = require('./effect');

module.exports = (function levelGenerator() {
  return {
    init: function init() {
      // initializes a map and the map state
      this.map = mapGenerator();
      this.mapState = mapGenerator('empty').copy(this.map);

      this.time = 0;
      this.effects = [];
      this.entities = [];
    },

    addEffect: function addEffect(type, x, y) {
      // creates an effect in the level
      const newEffect = Object.create(effectGenerator);
      newEffect.init(type, x, y);
      newEffect.lastAnimated = this.time;
      this.effects.push(newEffect);
    },

    state: function state() {
      return this.mapState;
    },

    update: function update(time) {
      this.time = time;
      // check if map state has changed
      let updateNecessary;

      if (Math.random() * 100 > 80) {
        const [x, y] = this.map.randomWalkableTile();
        this.addEffect('explosion', x, y);
      }

      if (Math.random() * 100 > 40) {
        const [x, y] = this.map.randomWalkableTile();
        this.addEffect('wisp', x, y);
      }

      // update any effect states
      this.applyEffects(this.effects.slice());
      
      return updateNecessary;
    },

    applyEffects: function applyEffects(effects) {
      effects.forEach((effect, idx) => {
        if (this.time - effect.lastAnimated >= effect.config.speed) {
          // eslint-disable-next-line no-param-reassign
          effect.lastAnimated = this.time;
          const affected = effect.animate();
          if (affected) {
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
    },
  };
}());
