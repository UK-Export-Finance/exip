const { FIELD_IDS } = require('../constants');
const { sanitiseFormData } = require('./sanitise-form-data');

const {
  SINGLE_POLICY_LENGTH,
  MULTI_POLICY_LENGTH,
  POLICY_LENGTH,
} = FIELD_IDS;

const mapSubmittedData = (submittedData) => {
  const mapped = submittedData;

  if (mapped[SINGLE_POLICY_LENGTH]) {
    mapped[POLICY_LENGTH] = mapped[SINGLE_POLICY_LENGTH];

    delete mapped[SINGLE_POLICY_LENGTH];
  }

  if (mapped[MULTI_POLICY_LENGTH]) {
    mapped[POLICY_LENGTH] = mapped[MULTI_POLICY_LENGTH];

    delete mapped[MULTI_POLICY_LENGTH];
  }

  return mapped;
};

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
