const mapGenerator = require('./mapGenerator');
const effectGenerator = require('./effect');
const entityGenerator = require('./entity');
const tiles = require('../data/tiles');

module.exports = (function levelGenerator() {
  const ATTACK_DISTANCE = 6; // maximum distance for player to attack enemies
  const MAX_ENEMY_COUNT = 3; // maximum number of enemies in a level

  // types of projectile entities used for attacking
  const ATTACKS = [
    'firebolt',
    'arcanebolt',
    'icebolt',
  ];

  // types of effects to use for an enemy kill
  const KILL_EFFECTS = [
    'explosion',
    'iceshatter',
    'arcanestorm',
    'heartsplosion',
  ];

  return {
    init: function init(entry) {
      // initializes a map and the map state
      this.effects = [];
      this.entities = [];
      this.time = Date.now();

      const { map, entities } = mapGenerator({ entry });
      this.map = map;
      entities.forEach(entity => this.addEntity(...entity));
      this.mapState = mapGenerator({ entry: [], type: 'empty' }).map;
      this.mapState.copy(this.map);


      this.prepareMap();
    },

    addEntity: function addEntity(type, x, y, target) {
      const newEntity = Object.create(entityGenerator);
      newEntity.init(type, x, y, target);
      newEntity.lastAnimated = this.time;
      this.entities.push(newEntity);
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
      this.mapState.copy(this.map);

      this.effects.forEach((effect) => {
        const effectState = effect.getState();
        if (effectState) {
          effectState.forEach((pixel) => {
            const current = this.mapState.at(pixel.x, pixel.y);
            if (pixel.style && tiles[current.name].zLevel < tiles[pixel.style].zLevel) {
              this.mapState.set(pixel.x, pixel.y, pixel.style);
            }
          });
        }
      });

      this.entities.forEach((entity) => {
        const style = entity.currentStyle();
        const { coords } = entity;
        const current = this.mapState.at(...coords);
        if (tiles[current.name].zLevel < tiles[style].zLevel) {
          this.mapState.set(...coords, style);
        }
      });

      return this.mapState;
    },

    update: function update(time) {
      // updates the map state with effect or entity changes
      this.time = time;
      let rerenderNeeded = false;

      if (Math.random() * 100 > 98) {
        const coords = this.mapState.randomWalkableTile();
        this.addEffect('wisp', ...coords);
      }

      // check for victory condition
      const player = this.player();
      if (player.coords.every((c, i) => c === player.target[i])) this.completed = true;

      // update all effect states
      const { removeEffects, effectsChanged } = this.applyEffects(this.effects);
      this.removeObjects(this.effects, removeEffects);
      if (effectsChanged) rerenderNeeded = true;

      // update all entity states
      const { removeEntities, entitiesChanged } = this.applyEntities(this.entities);
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
          const running = effect.animate();
          // eslint-disable-next-line no-param-reassign
          effect.lastAnimated = this.time;
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
      // this should be separated into methods called after determining the entity type
      let entitiesChanged = false;

      const removeEntities = entities.reduce((graveyard, entity, idx) => {
        const timeSinceAnimate = this.time - entity.lastAnimated;
        if (timeSinceAnimate > entity.config.speed) {
          entitiesChanged = true;

          if (entity === this.player() && !this.completed) {
            // set player to non-attacking if no more projectiles on map
            const projectile = this.entities.find(e => ATTACKS.includes(e.config.name));
            if (!projectile) {
              // eslint-disable-next-line no-param-reassign
              entity.attacking = false;
              this.actPlayer();
            }
          }

          if (ATTACKS.includes(entity.config.name)) {
            this.processProjectile(entity);
          }

          if (!entity.static && !entity.attacking) this.actEntity(entity);

          if (entity.config.animated) entity.nextStyle();

          // eslint-disable-next-line no-param-reassign
          entity.lastAnimated = this.time;
        }
        if (entity.die) graveyard.push(idx);
        return graveyard;
      }, []);
      return { removeEntities, entitiesChanged };
    },

    actEntity: function actEntity(entity) {
      const nextStep = this.determineEntityMove(entity);

      if (nextStep) {
        // eslint-disable-next-line no-param-reassign
        entity.coords = nextStep;
      }
    },

    player: function player() {
      return this.entities.find(entity => entity.config.name === 'player');
    },

    determineEntityMove: function determineEntityMove(entity) {
      // determines the next tile to move to for each entity,
      // depending of its target (either coordinates or an entity name)
      const { coords, target } = entity;
      let toTarget;

      if (typeof target === 'string') {
        const targetEntity = this.entities.find(e => e.config.name === target);
        if (!targetEntity) return null; // entity dead?
        toTarget = this.map.pathTo(...coords, ...targetEntity.coords);
      } else if (Array.isArray(target)) {
        toTarget = this.map.pathTo(...coords, ...target);
      }

      let nextStep;

      if (toTarget && toTarget.pathTo[1]) {
        // eslint-disable-next-line prefer-destructuring
        nextStep = toTarget.pathTo[1];
      }

      return nextStep || null;
    },

    actPlayer: function actPlayer() {
      // executes attacks in the player qualifies for one (enemy in range)
      const player = this.player();

      // find enemies in range
      const paths = this.mapState.pathsFrom(...player.coords, tile => tile.walkable);
      const enemiesInRange = this.entities
        .filter(entity => entity.config.name.startsWith('enemy'))
        .filter(entity => paths[entity.coords.join(',')])
        .filter(entity => paths[entity.coords.join(',')].distance <= ATTACK_DISTANCE);

      if (enemiesInRange.length > 0) {
        // set player to attacking (doesn't move anymore), determine random attack type,
        // create projectile entity to target
        player.attacking = true;
        const attack = ATTACKS[Math.floor(Math.random() * ATTACKS.length)];
        this.addEntity(attack, ...player.coords, enemiesInRange[0].config.name);
      }
    },

    processProjectile: function processProjectile(projectile) {
      // determines if projectile has reached target, finishes attack
      const target = this.entities.find(e => e.config.name === projectile.target);
      if (!target) {
        // eslint-disable-next-line no-param-reassign
        projectile.die = true;
        return null;
      }

      if (projectile.coords.join(',') === target.coords.join(',')) {
        // set target and projectile to die, clear target tile, add kill effect at target position,
        // set player to not attacking
        target.die = true;
        // eslint-disable-next-line no-param-reassign
        projectile.die = true;
        const killEffect = KILL_EFFECTS[Math.floor(Math.random() * KILL_EFFECTS.length)];
        this.addEffect(killEffect, ...target.coords);
        this.player().attacking = false;
      }
      return null;
    },

    prepareMap: function prepareMap(enemyCount = Math.floor(Math.random() * MAX_ENEMY_COUNT)) {
      this.addEntity('player', ...this.map.entry, this.map.exit);
      this.player().attacking = false;
      for (let count = 0; count <= enemyCount; count += 1) {
        const coords = this.mapState.randomWalkableTile();
        this.addEntity(`enemy${count + 1}`, ...coords, 'player');
      }
    },
  };
}());
