import companyDetailsResponseRules from './rules';
import { RequestBody, ValidationErrors } from '../../../../../../../types';

/**
 * validates company details page response
 * throws validation errors if any fields are not completed or incorrectly completed
 * @param {Express.Request.body} responseBody containing an object with the company details response body
 * @returns {object} object containing errors or blank object
 */
const validation = (responseBody: RequestBody, errors: object) => {
  let updatedErrors = errors;

  /* eslint-disable no-unused-vars, prettier/prettier */
  companyDetailsResponseRules.forEach((rule: (ruleData: object, ruleErrors: ValidationErrors) => ValidationErrors) => {
    /* eslint-enable no-unused-vars, prettier/prettier */
    updatedErrors = rule(responseBody, updatedErrors);
  });

  return updatedErrors;
};

export default validation;
