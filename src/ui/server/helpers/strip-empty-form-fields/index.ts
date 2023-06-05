import { RequestBody } from '../../../types';

/**
 * stripEmptyFormFields
 * Filters out form fields with empty values
 * @param {Express.Request.body} Form data
 * @returns {Object} Form data without empty values
 */
const stripEmptyFormFields = (formBody: RequestBody) => {
  const fieldsWithValues = {};

  const keys = Object.keys(formBody);

  keys.forEach((key) => {
    const value = formBody[key];

    const hasValue = Boolean(value) || value === false;

    if (hasValue) {
      fieldsWithValues[key] = value;
    }
  });

  return fieldsWithValues;
};

export default stripEmptyFormFields;
