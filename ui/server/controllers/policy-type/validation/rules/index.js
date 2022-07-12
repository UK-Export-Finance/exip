const policyTypeRules = require('./policy-type');
const policyLengthRules = require('./policy-length');

const rules = [
  policyTypeRules,
  policyLengthRules,
];

module.exports = rules;
