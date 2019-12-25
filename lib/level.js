const mapGenerator = require('./mapGenerator');
const effectGenerator = require('./effect');
const entityGenerator = require('./entity');
const tiles = require('../data/tiles');

module.exports = (function levelGenerator() {
  return {
    init: function init(entry) {
      // initializes a map and the map state
      this.map = mapGenerator({ entry });
      this.mapState = mapGenerator({ entry: [], type: 'empty' }).copy(this.map);

      this.time = Date.now();
      this.effects = [];
      this.entities = [];

      this.prepareMap();
    },

    addEntity: function addEntity(type, x, y, targetX, targetY) {
      const newEntity = Object.create(entityGenerator);
      newEntity.init(type, x, y, targetX, targetY);
      newEntity.lastAnimated = this.time;
      this.entities.push(newEntity);
      this.mapState.set(x, y, type);
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
      let rerenderNeeded = false;

      if (Math.random() * 100 > 90) {
        const dst = this.mapState.randomWalkableTile();
        this.addEffect('wisp', ...dst);
      }

      // check for victory condition
      const player = this.player();
      if (player.coords.every((c, i) => c === player.target[i])) this.completed = true;

      // update all effect states
      const { removeEffects, effectsChanged } = this.applyEffects(this.effects.slice());
      this.removeObjects(this.effects, removeEffects);
      if (effectsChanged) rerenderNeeded = true;

      // update all entity states
      const { removeEntities, entitiesChanged } = this.applyEntities(this.entities.slice());
      this.removeObjects(this.entities, removeEntities);
      if (entitiesChanged) rerenderNeeded = true;

      return rerenderNeeded;
    },

    applyEffects: function applyEffects(effects) {
      // checks all effects for their animation speed to
      // determine if they need updating and process said update
      let effectsChanged = false;

      const removeEffects = effects.reduce((graveyard, effect, idx) => {
        const timeSinceAnimate = this.time - effect.lastAnimated;
        if (timeSinceAnimate > effect.config.speed) {
          const running = this.animateEffect(effect, idx);
          effectsChanged = true;
          // if effect is over, add to effects that will be deleted
          if (!running) graveyard.push(idx);
        }
        return graveyard;
      }, []);

      return { removeEffects, effectsChanged };
    },

    applyEntities: function applyEntities(entities) {
      // checks all entities for their next action and
      // process their updates if needed
      let entitiesChanged = false;

      const removeEntities = entities.reduce((graveyard, entity, idx) => {
        const timeSinceAnimate = this.time - entity.lastAnimated;
        if (timeSinceAnimate > entity.config.speed) {
          entitiesChanged = true;
          if (!entity.static) this.actEntity(entity, idx);
          this.entities[idx].lastAnimated = this.time;
        }
        if (entity.die) graveyard.push(idx);
        return graveyard;
      }, []);
      return { removeEntities, entitiesChanged };
    },

    animateEffect: function animateEffect(effect, idx) {
      // updates map state to reflect new animation step for effect
      this.effects[idx].lastAnimated = this.time;

      const affected = effect.animate();
      // check if effect duration has expired and mark as moribund
      if (!affected) return null;

      affected.forEach((tile) => {
        const currentTile = this.mapState.at(tile.x, tile.y);
        let newType;
        if (tile.style && currentTile.walkable) newType = tile.style;
        if (!newType) newType = this.map.at(tile.x, tile.y).name;

        // to not overwrite the player, maybe fix this properly later
        if (currentTile.zLevel > 90) newType = currentTile.name;

        const newTile = tiles[newType];
        if (!tile.style || currentTile.zLevel <= newTile.zLevel) {
          this.mapState.set(tile.x, tile.y, newType);
        }
      });
      return true;
    },

    actEntity: function actEntity(entity, idx) {
      const pos = entity.coords;
      const { target } = entity;
      const paths = this.mapState.pathsFrom(...pos);
      const toTarget = paths[target.join(',')];
      let nextStep;

      if (toTarget && toTarget.pathTo.slice(1, 2).length > 0) nextStep = toTarget.pathTo.slice(1, 2);
      if (!nextStep) nextStep = [target];
      if (!nextStep || !this.mapState.at(...target).walkable) nextStep = [pos];

      this.mapState.set(...entity.coords, this.map.at(...entity.coords).name);
      // eslint-disable-next-line prefer-destructuring
      this.entities[idx].coords = nextStep[0];
      this.mapState.set(...nextStep[0], entity.config.name);
    },

    player: function player() {
      return this.entities.find(entity => entity.config.name === 'player');
    },

    prepareMap: function prepareMap(enemyCount = Math.floor(Math.random() * 5)) {
      this.addEntity('player', ...this.map.entry, ...this.map.exit);
      for (let count = 0; count <= enemyCount; count += 1) {
        const coords = this.mapState.randomWalkableTile();
        this.addEntity('enemy', ...coords, ...this.map.entry);
      }
    },
  };
}());
