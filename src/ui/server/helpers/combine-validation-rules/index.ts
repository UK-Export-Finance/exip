import { isPopulatedArray } from '../array';
import { ValidationErrors } from '../../../types';

/**
 * combineValidationRules
 * combine multiple validation rule results into a single object
 * throws validation errors if any fields are not completed or incorrectly completed
 * @param {Express.Request.body} responseBody containing an object with the company details response body
 * @returns {object} object containing errors from multiple fields/rules, or a blank object
 */
/* eslint-disable no-unused-vars, prettier/prettier */
const combineValidationRules = (rules: Array<(formBody: object, errors: ValidationErrors) => ValidationErrors>, data: object) => {
  /* eslint-enable no-unused-vars, prettier/prettier */
  let errors = {};

  rules.forEach((rule) => {
    errors = rule(data, errors);
  });

  if (isPopulatedArray(Object.keys(errors))) {
    return errors;
  }

  return false;
};

export default combineValidationRules;
