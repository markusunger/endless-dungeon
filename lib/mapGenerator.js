/*
 - creates a map from a template
 - adds prefabs when possible or configured
 - returns a new map consisting only of floor and wall tiles,
   plus info about entry (spawn location for the player) and exit
*/

const templateAutomaton = require('./maps/templateAutomaton');
const templateEmpty = require('./maps/templateEmpty');

const MAP_WIDTH = 16;
const MAP_HEIGHT = 16;

module.exports = function generate(type = 'automaton') {
  if (type === 'automaton') {
    return templateAutomaton(MAP_WIDTH, MAP_HEIGHT);
  }
  return templateEmpty(MAP_WIDTH, MAP_HEIGHT);
};
