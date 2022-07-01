const mapPeriodMonths = require('./map-period-months');
const {
  FIELD_IDS,
  FIELD_VALUES,
} = require('../../constants');

const {
  POLICY_TYPE,
  POLICY_LENGTH,
  SINGLE_POLICY_LENGTH,
  MULTI_POLICY_LENGTH,
} = FIELD_IDS;

const mapPolicyLength = (answers) => {
  let mapped;

  if (answers[POLICY_TYPE] === FIELD_VALUES.POLICY_TYPE.SINGLE) {
    mapped = {
      [SINGLE_POLICY_LENGTH]: {
        text: mapPeriodMonths(answers[POLICY_LENGTH]),
      },
    };
  }

  if (answers[POLICY_TYPE] === FIELD_VALUES.POLICY_TYPE.MULTI) {
    mapped = {
      [MULTI_POLICY_LENGTH]: {
        text: mapPeriodMonths(answers[POLICY_LENGTH]),
      },
    };
  }

  return mapped;
};

module.exports = mapPolicyLength;
