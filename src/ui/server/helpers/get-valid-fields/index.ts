/**
 * getValidFields
 * Strip invalid fields from submitted form data
 * @param {Object} Form data
 * @param {Object} Errors list
 * @returns {Object} Form data with invalid fields removed
 */
const getValidFields = (formData: object, errorList: object) => {
  if (formData) {
    if (errorList) {
      const fieldsWithErrors = Object.keys(errorList);

      const validFields = {};

      Object.keys(formData).forEach((fieldName) => {
        if (!fieldsWithErrors.includes(fieldName)) {
          validFields[fieldName] = formData[fieldName];
        }
      });

      return validFields;
    }

    return formData;
  }

  return {};
};

export default getValidFields;
