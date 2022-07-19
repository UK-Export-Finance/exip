const currencyRules = require('./currency');
const { amountRules } = require('./amount');
const creditPeriodRules = require('./credit-period');
const percentageOfCoverRules = require('./percentage-of-cover');

const rules = [
  currencyRules,
  amountRules,
  percentageOfCoverRules,
  creditPeriodRules,
];

module.exports = rules;
