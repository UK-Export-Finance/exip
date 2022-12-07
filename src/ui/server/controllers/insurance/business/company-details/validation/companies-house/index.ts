import companiesHouseRules from './rules';
import { RequestBody } from '../../../../../../../types';

/**
 * validates formBody for entered companies house number
 * throws validation errors if incorrect format
 * @param formBody containing an object with the requestBody containing the companies house number input
 * @returns object containing errors or blank object
 */
const validation = (formBody: RequestBody) => {
  let errors!: object;

  for (let i = 0; i < companiesHouseRules.length; i += 1) {
    errors = companiesHouseRules[i](formBody, errors);
  }

  return errors;
};

export default validation;
