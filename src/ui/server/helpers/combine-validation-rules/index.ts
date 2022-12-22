import { ValidationErrors } from '../../../types';

/**
 * combineValidationRules
 * validates company details page response
 * throws validation errors if any fields are not completed or incorrectly completed
 * @param {Express.Request.body} responseBody containing an object with the company details response body
 * @returns {object} object containing errors or blank object
 */
/* eslint-disable no-unused-vars, prettier/prettier */
const combineValidationRules = (rules: Array<(formBody: object, errors: ValidationErrors) => ValidationErrors>, data: object) => {
  /* eslint-enable no-unused-vars, prettier/prettier */
  let errors = {};

  rules.forEach((rule) => {
    errors = rule(data, errors);
  });

  if (Object.keys(errors).length) {
    return errors;
  }

  return false;
};

export default combineValidationRules;
