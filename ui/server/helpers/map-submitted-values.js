const { FIELD_IDS, FIELD_VALUES } = require('../constants');
const { objectHasValues } = require('./object');

const {
  POLICY_TYPE,
  SINGLE_POLICY_LENGTH,
  MULTI_POLICY_LENGTH,
  POLICY_LENGTH,
} = FIELD_IDS;

/*
 * mapSubmittedValues
 * Map single/multi policy length fields to the submitted policy length.
 */
const mapSubmittedValues = (submittedData) => {
  const mapped = submittedData;

  if (objectHasValues(submittedData)) {
    if (mapped[POLICY_TYPE] === FIELD_VALUES.POLICY_TYPE.SINGLE) {
      mapped[SINGLE_POLICY_LENGTH] = submittedData[POLICY_LENGTH];
    }

    if (mapped[POLICY_TYPE] === FIELD_VALUES.POLICY_TYPE.MULTI) {
      mapped[MULTI_POLICY_LENGTH] = submittedData[POLICY_LENGTH];
    }

    delete mapped[POLICY_LENGTH];
  }

  return mapped;
};

module.exports = mapSubmittedValues;
