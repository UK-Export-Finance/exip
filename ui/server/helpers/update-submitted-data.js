const { FIELD_IDS, FIELD_VALUES } = require('../constants');
const { sanitiseData } = require('./sanitise-data');

const {
  CREDIT_PERIOD,
  CONTRACT_VALUE,
  MAX_AMOUNT_OWED,
  MULTI_POLICY_LENGTH,
  POLICY_LENGTH,
  POLICY_TYPE,
  SINGLE_POLICY_LENGTH,
} = FIELD_IDS;

/*
 * mapSubmittedData
 * Map "single/multi policy length" fields to policy length.
 * Delete single policy length if policy type is multi.
 * Delete multi policy length if policy type is single.
 * Delete contract value if policy type is multi.
 * Delete maximum amount owed if policy type is single.
 */
const mapSubmittedData = (submittedData) => {
  const mapped = submittedData;

  const isSinglePolicy = (submittedData[POLICY_TYPE] === FIELD_VALUES.POLICY_TYPE.SINGLE);
  const isMultiPolicy = (submittedData[POLICY_TYPE] === FIELD_VALUES.POLICY_TYPE.MULTI);

  if (isSinglePolicy) {
    mapped[POLICY_LENGTH] = submittedData[SINGLE_POLICY_LENGTH];
    delete mapped[MULTI_POLICY_LENGTH];
    delete mapped[CREDIT_PERIOD];
    delete mapped[MAX_AMOUNT_OWED];
  }

  if (isMultiPolicy) {
    mapped[POLICY_LENGTH] = submittedData[MULTI_POLICY_LENGTH];
    delete mapped[SINGLE_POLICY_LENGTH];
    delete mapped[CONTRACT_VALUE];
  }

  return mapped;
};

/*
 * updateSubmittedData
 * update session data with sanitised form data
 */
const updateSubmittedData = (formData, existingData) => {
  const { _csrf, ...submittedFormData } = formData;

  const modifiedData = {
    ...existingData,
    ...submittedFormData,
  };

  const sanitised = sanitiseData(modifiedData);

  const mappedFormData = mapSubmittedData(sanitised);

  return mappedFormData;
};

module.exports = {
  mapSubmittedData,
  updateSubmittedData,
};
