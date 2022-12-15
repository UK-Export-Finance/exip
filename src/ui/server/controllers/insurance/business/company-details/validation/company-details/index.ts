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

  for (let i = 0; i < companyDetailsResponseRules.length; i += 1) {
    updatedErrors = companyDetailsResponseRules[i](responseBody, errors);
  }

  return updatedErrors;
};

export default validation;
