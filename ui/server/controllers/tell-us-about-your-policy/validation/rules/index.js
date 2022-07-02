const currencyRules = require('./currency');
const amountRules = require('./amount');
const policyTypeRules = require('./policy-type');
const policyLengthRules = require('./policy-length');
const creditPeriodRules = require('./credit-period');

const rules = [
  currencyRules,
  amountRules,
  policyTypeRules,
  policyLengthRules,
  creditPeriodRules,
];

module.exports = rules;
