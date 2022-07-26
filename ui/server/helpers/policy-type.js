const { FIELD_VALUES } = require('../constants');

const isSinglePolicyType = (policyType) => {
  if (policyType === FIELD_VALUES.POLICY_TYPE.SINGLE) {
    return true;
  }

  return false;
};

const isMultiPolicyType = (policyType) => {
  if (policyType === FIELD_VALUES.POLICY_TYPE.MULTI) {
    return true;
  }

  return false;
};

module.exports = {
  isSinglePolicyType,
  isMultiPolicyType,
};
