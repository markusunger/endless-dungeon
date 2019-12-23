const mapGenerator = require('./mapGenerator');
const effectGenerator = require('./effect');
const entityGenerator = require('./entity');
// const tiles = require('../data/tiles');

module.exports = (function levelGenerator() {
  return {
    init: function init(entry) {
      // initializes a map and the map state
      this.map = mapGenerator(entry);
      this.mapState = mapGenerator('empty').copy(this.map);

      this.time = Date.now();
      this.effects = [];
      this.entities = [];

      this.addEntity('player', ...this.map.entry, ...this.map.exit);
    },

    addEntity: function addEntity(type, x, y, targetX, targetY) {
      const newEntity = Object.create(entityGenerator);
      newEntity.init(type, x, y, targetX, targetY);
      newEntity.lastAnimated = this.time;
      this.entities.push(newEntity);
      this.mapState.set(x, y, newEntity.config.name);
    },

    addEffect: function addEffect(type, x, y) {
      // creates an effect in the level
      const newEffect = Object.create(effectGenerator);
      newEffect.init(type, x, y);
      newEffect.lastAnimated = this.time;
      this.effects.push(newEffect);
    },

    removeObjects: function removeObject(target, idxs) {
      for (let i = idxs.length - 1; i >= 0; i -= 1) {
        // remove from end to not change indexing
        target.splice(idxs[i], 1);
      }
    },

    state: function state() {
      return this.mapState;
    },

    update: function update(time) {
      // updates the map state with effect or entity changes
      this.time = time;

      if (Math.random() * 100 > 90) {
        const dst = this.mapState.randomWalkableTile();
        this.addEffect('wisp', ...dst);
      }

      // check for victory condition
      const player = this.player();
      if (player.coords.every((c, i) => c === player.target[i])) this.completed = true;

      // update all effect states
      let remove = this.applyEffects(this.effects.slice());
      this.removeObjects(this.effects, remove);

      // update all entity states
      remove = this.applyEntities(this.entities.slice());
      this.removeObjects(this.entities, remove);

      return false;
    },

    applyEffects: function applyEffects(effects) {
      // checks all effects for their animation speed to
      // determine if they need updating and process said update
      const removal = effects.reduce((graveyard, effect, idx) => {
        const timeSinceAnimate = this.time - effect.lastAnimated;
        if (timeSinceAnimate > effect.config.speed) {
          const running = this.animateEffect(effect, idx);
          // if effect is over, add to effects that will be deleted
          if (!running) graveyard.push(idx);
        }
        return graveyard;
      }, []);
      return removal;
    },

    applyEntities: function applyEntities(entities) {
      // checks all entities for their next action and
      // process their updates if needed
      const removal = entities.reduce((graveyard, entity, idx) => {
        const timeSinceAnimate = this.time - entity.lastAnimated;
        if (timeSinceAnimate > entity.config.speed) {
          if (!entity.static) this.actEntity(entity, idx);
          this.entities[idx].lastAnimated = this.time;
        }
        if (entity.die) graveyard.push(idx);
        return graveyard;
      }, []);
      return removal;
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
          : this.map.at(tile.x, tile.y).name;
        this.mapState.set(tile.x, tile.y, newType);
      });
      return true;
    },

    actEntity: function actEntity(entity, idx) {
      // console.log(entity);
      const pos = entity.coords;
      const { target } = entity;
      const paths = this.mapState.pathsFrom(...pos);
      const toTarget = paths[target.join(',')];
      let nextStep;

      if (toTarget) nextStep = toTarget.pathTo.slice(1, 2);
      if (nextStep.length === 0) nextStep = [target];

      this.mapState.set(...entity.coords, this.map.at(...entity.coords).name);
      // eslint-disable-next-line prefer-destructuring
      this.entities[idx].coords = nextStep[0];
      this.mapState.set(...nextStep[0], entity.config.name);
    },

    player: function player() {
      return this.entities.find(entity => entity.config.name === 'player');
    },
  };
}());
