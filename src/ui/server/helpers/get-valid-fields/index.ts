import { isEmptyString } from '../string';

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

    /**
     * Do not return fields that are in the errors,
     * but return fields that are empty - a user might have deleted an answer.
     */
    if (!fieldsWithErrors.includes(fieldName) || isEmptyString(fieldValue)) {
      validFields[fieldName] = fieldValue;
    }
  });

  return validFields;
};

export default getValidFields;
