/*
 - creates a map from a template
 - adds prefabs when possible or configured
 - returns a new map consisting only of floor and wall tiles,
   plus info about entry (spawn location for the player) and exit
*/

const templateAutomaton = require('./maps/templateAutomaton');
const templateDrunken = require('./maps/templateDrunken');

const MAP_WIDTH = 17;
const MAP_HEIGHT = 7;
const TYPES = [templateAutomaton, templateDrunken];

module.exports = function generate() {
  const randomType = Math.floor(Math.random() * TYPES.length);
  return TYPES[randomType](MAP_WIDTH, MAP_HEIGHT);
};
