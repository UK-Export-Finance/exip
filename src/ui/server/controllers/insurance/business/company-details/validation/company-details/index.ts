import companyDetailsResponseRules from './rules';
import { RequestBody } from '../../../../../../../types';

/**
 * validates company details page response
 * throws validation errors if any fields are not completed or incorrectly completed
 * @param {Express.Request.body} responseBody containing an object with the company details response body
 * @returns {object} object containing errors or blank object
 */
const validation = (responseBody: RequestBody, errors: object) => {
  let updatedErrors = errors;

  companyDetailsResponseRules.forEach((rule) => {
    updatedErrors = rule(responseBody, updatedErrors);
  });

  return updatedErrors;
};

export default validation;
