import { RequestBody } from '../../../types';

/**
 * stripEmptyFormFields
 * Filters out form fields with empty values
 * @param {Express.Request.body} Form data
 * @returns {Object} Form data without empty values
 */
export const stripEmptyFormFields = (formBody: RequestBody) => {
  if (formBody) {
    const fieldsWithValues = {};

    const keys = Object.keys(formBody);

    keys.forEach((key) => {
      const value = formBody[key];

      const hasValue = Boolean(value);

      if (hasValue) {
        fieldsWithValues[key] = value;
      }
    });

    return fieldsWithValues;
  }

  return {};
};

/**
 * hasFormData
 * Checks if form data has values
 * @param {Express.Request.body} Form data
 * @returns {Boolean}
 */
const hasFormData = (formBody: RequestBody) => {
  if (!formBody) {
    return false;
  }

  const { _csrf, ...formData } = formBody;

  if (formData && Object.keys(formData).length) {
    const fieldsWithValues = stripEmptyFormFields(formData);

    if (Object.keys(fieldsWithValues).length) {
      return true;
    }
  }

  return false;
};

export default hasFormData;
