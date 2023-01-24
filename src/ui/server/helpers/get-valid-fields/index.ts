/**
 * getValidFields
 * Strip invalid fields from submitted form data
 * @param {Object} Form data
 * @param {Object} Errors list
 * @returns {Object} Form data with invalid fields removed
 */
const getValidFields = (formData: object, errorList: object) => {
  const fieldsWithErrors = Object.keys(errorList);

  const validFields = {};

  Object.keys(formData).forEach((fieldName) => {
    const fieldValue = formData[fieldName];

    if (!fieldsWithErrors.includes(fieldName) && fieldValue !== '') {
      validFields[fieldName] = fieldValue;
    }
  });

  return validFields;
};

export default getValidFields;
