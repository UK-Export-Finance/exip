import companyDetailsResponseRules from './rules';
import { RequestBody } from '../../../../../../../types';

/**
 * validates company details page response
 * throws validation errors if any fields are not completed or incorrectly completed
 * @param responseBody containing an object with the company details response body
 * @returns object containing errors or blank object
 */
const validation = (responseBody: RequestBody) => {
  let errors!: object;

  for (let i = 0; i < companyDetailsResponseRules.length; i += 1) {
    errors = companyDetailsResponseRules[i](responseBody, errors);
  }

  return errors;
};

export default validation;
