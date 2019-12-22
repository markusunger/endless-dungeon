/*
 - creates a map from a template
 - adds prefabs when possible or configured
 - returns a new map consisting only of floor and wall tiles,
   plus info about entry (spawn location for the player) and exit
*/

const templateAutomaton = require('./maps/templateAutomaton');
const templateEmpty = require('./maps/templateEmpty');
const templateDrunken = require('./maps/templateDrunken');

const MAP_WIDTH = 16;
const MAP_HEIGHT = 16;
const TYPES = [templateEmpty];

module.exports = function generate() {
  const mapType = Math.floor(Math.random() * TYPES.length);
  return TYPES[mapType](MAP_WIDTH, MAP_HEIGHT);
};
