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
      // updates the map state with effect or entity changes
      this.time = time;

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
    },

    applyEffects: function applyEffects(effects) {
      // checks all effects for their animation speed to
      // determine if they need updating and process said update
      const moribund = [];

      effects.forEach((effect, idx) => {
        const timeSinceAnimate = this.time - effect.lastAnimated;
        if (timeSinceAnimate > effect.config.speed) {
          const running = this.animateEffect(effect, idx);
          // if effect is over, add to effects that will be deleted
          if (!running) moribund.push(idx);
        }
      });

      for (let i = moribund.length - 1; i >= 0; i -= 1) {
        // remove from end to not change indexing
        this.effects.splice(moribund[i], 1);
      }
    },

    animateEffect: function animateEffect(effect, idx) {
      // updates map state to reflect new animation step for effect
      this.effects[idx].lastAnimated = this.time;

      const affected = effect.animate();
      // check if effect duration has expired and mark as moribund
      if (!affected) return null;

      affected.forEach((tile) => {
        const overlayable = this.map.overlayableAt(tile.x, tile.y);
        const newType = tile.style && overlayable
          ? tile.style
          : this.map.at(tile.x, tile.y).type;
        this.mapState.set(tile.x, tile.y, { type: newType });
      });
      return true;
    },
  };
}());
