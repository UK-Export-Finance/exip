const { isSinglePolicyType, isMultiPolicyType } = require('../policy-type');
const mapPeriodMonths = require('./map-period-months');
const { FIELD_IDS } = require('../../constants');

const {
  POLICY_TYPE,
  POLICY_LENGTH,
  SINGLE_POLICY_LENGTH,
  MULTI_POLICY_LENGTH,
} = FIELD_IDS;

const mapPolicyLength = (answers) => {
  let mapped;

  if (isSinglePolicyType(answers[POLICY_TYPE])) {
    mapped = {
      [SINGLE_POLICY_LENGTH]: {
        text: mapPeriodMonths(answers[POLICY_LENGTH]),
      },
    };
  }

  if (isMultiPolicyType(answers[POLICY_TYPE])) {
    mapped = {
      [MULTI_POLICY_LENGTH]: {
        text: mapPeriodMonths(answers[POLICY_LENGTH]),
      },
    };
  }

  return mapped;
};

module.exports = mapPolicyLength;
