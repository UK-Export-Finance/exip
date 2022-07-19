const months2 = require('./2-months');
const months3 = require('./3-months');
const months4 = require('./4-months');
const months5 = require('./5-months');
const months6 = require('./6-months');
const months7 = require('./7-months');
const months8 = require('./8-months');
const months9 = require('./9-months');

const COVER_PERCENTAGES = [
  80,
  85,
  90,
  95,
];

const RATES = [
  months2,
  months3,
  months4,
  months5,
  months6,
  months7,
  months8,
  months9,
];

const veryHighRisk = {
  COVER_PERCENTAGES,
  RATES,
};

module.exports = veryHighRisk;
