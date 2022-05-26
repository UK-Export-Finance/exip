const { sanitiseFormData } = require('./sanitise-form-data');

const updateSubmittedData = (formData, existingData) => {
  const { _csrf, ...submittedFormData } = formData;

  let modifiedData;

  if (existingData) {
    modifiedData = {
      ...existingData,
      ...sanitiseFormData(submittedFormData),
    };

    return modifiedData;
  }

  modifiedData = sanitiseFormData(submittedFormData);

  return modifiedData;
};

module.exports = updateSubmittedData;
