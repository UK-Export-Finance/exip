const currencyRules = require('./currency');
const { costRules } = require('./cost');
const creditPeriodRules = require('./credit-period');
const percentageOfCoverRules = require('./percentage-of-cover');

const rules = [
  currencyRules,
  costRules,
  percentageOfCoverRules,
  creditPeriodRules,
];

module.exports = rules;
