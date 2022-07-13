const currencyRules = require('./currency');
const amountRules = require('./amount');
const creditPeriodRules = require('./credit-period');

const rules = [
  currencyRules,
  amountRules,
  creditPeriodRules,
];

module.exports = rules;
