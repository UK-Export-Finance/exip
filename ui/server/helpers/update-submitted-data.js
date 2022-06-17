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
 */
const mapSubmittedData = (submittedData) => {
  const mapped = submittedData;

  const isSinglePolicy = (mapped[POLICY_TYPE] === FIELD_VALUES.POLICY_TYPE.SINGLE);
  const isMultiPolicy = (mapped[POLICY_TYPE] === FIELD_VALUES.POLICY_TYPE.MULTI);

  if (isSinglePolicy) {
    mapped[POLICY_LENGTH] = mapped[SINGLE_POLICY_LENGTH];
  }

  if (isMultiPolicy) {
    mapped[POLICY_LENGTH] = mapped[MULTI_POLICY_LENGTH];
  }

  delete mapped[SINGLE_POLICY_LENGTH];
  delete mapped[MULTI_POLICY_LENGTH];

  return mapped;
};

/*
 * updateSubmittedData
 * update session data with sanitised form data
 */
const updateSubmittedData = (formData, existingData) => {
  const { _csrf, ...submittedFormData } = formData;

  let modifiedData;

  const mappedFormData = mapSubmittedData(submittedFormData);

  if (existingData) {
    modifiedData = {
      ...existingData,
      ...sanitiseFormData(mappedFormData),
    };

    return modifiedData;
  }

  modifiedData = sanitiseFormData(mappedFormData);

  return modifiedData;
};

module.exports = {
  mapSubmittedData,
  updateSubmittedData,
};
