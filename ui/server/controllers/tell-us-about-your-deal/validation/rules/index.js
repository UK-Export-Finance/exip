const currencyRules = require('./currency');
const amountRules = require('./amount');
const creditPeriodRules = require('./credit-period');
const policyTypeRules = require('./policy-type');
const policyLengthRules = require('./policy-length');

const rules = [
  currencyRules,
  amountRules,
  creditPeriodRules,
  policyTypeRules,
  policyLengthRules,
];

module.exports = rules;
