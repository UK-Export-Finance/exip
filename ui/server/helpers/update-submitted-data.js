const { FIELD_IDS, FIELD_VALUES } = require('../constants');
const { sanitiseFormData } = require('./sanitise-form-data');

const {
  POLICY_TYPE,
  SINGLE_POLICY_LENGTH,
  MULTI_POLICY_LENGTH,
  POLICY_LENGTH,
} = FIELD_IDS;

/*
 * mapSubmittedData
 * Map "single/multi policy length" fields to policy length.
 * Delete single policy length if policy type is multi.
 * Delete multi policy length if policy type is single.
 */
const mapSubmittedData = (submittedData) => {
  const mapped = submittedData;

  const isSinglePolicy = (submittedData[POLICY_TYPE] === FIELD_VALUES.POLICY_TYPE.SINGLE);
  const isMultiPolicy = (submittedData[POLICY_TYPE] === FIELD_VALUES.POLICY_TYPE.MULTI);

  if (isSinglePolicy) {
    mapped[POLICY_LENGTH] = submittedData[SINGLE_POLICY_LENGTH];
    delete mapped[MULTI_POLICY_LENGTH];
  }

  if (isMultiPolicy) {
    mapped[POLICY_LENGTH] = submittedData[MULTI_POLICY_LENGTH];
    delete mapped[SINGLE_POLICY_LENGTH];
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

  const sanitised = sanitiseFormData(modifiedData);

  const mappedFormData = mapSubmittedData(sanitised);

  return mappedFormData;
};

module.exports = {
  mapSubmittedData,
  updateSubmittedData,
};
