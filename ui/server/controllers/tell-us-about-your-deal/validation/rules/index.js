const currencyRules = require('./currency');
const amountRules = require('./amount');
const preCreditPeriodRules = require('./pre-credit-period');
const creditPeriodRules = require('./credit-period');
const policyTypeRules = require('./policy-type');
const policyLengthRules = require('./policy-length');

const rules = [
  currencyRules,
  amountRules,
  preCreditPeriodRules,
  creditPeriodRules,
  policyTypeRules,
  policyLengthRules,
];

module.exports = rules;
