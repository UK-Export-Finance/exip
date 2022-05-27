const creditLimitGroupRules = require('./credit-limit-group');
const creditLimitRules = require('./credit-limit');
const preCreditPeriodRules = require('./pre-credit-period');
const creditPeriodRules = require('./credit-period');
const policyLengthRules = require('./policy-length');
const policyTypeRules = require('./policy-type');

const rules = [
  creditLimitGroupRules,
  creditLimitRules,
  preCreditPeriodRules,
  creditPeriodRules,
  policyLengthRules,
  policyTypeRules,
];

module.exports = rules;
