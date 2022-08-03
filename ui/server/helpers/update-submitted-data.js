const { FIELD_IDS } = require('../constants');
const { isSinglePolicyType, isMultiPolicyType } = require('./policy-type');
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

  if (isSinglePolicyType(submittedData[POLICY_TYPE])) {
    mapped[POLICY_LENGTH] = submittedData[SINGLE_POLICY_LENGTH];
    delete mapped[MULTI_POLICY_LENGTH];
    delete mapped[CREDIT_PERIOD];
    delete mapped[MAX_AMOUNT_OWED];
  }

  if (isMultiPolicyType(submittedData[POLICY_TYPE])) {
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
