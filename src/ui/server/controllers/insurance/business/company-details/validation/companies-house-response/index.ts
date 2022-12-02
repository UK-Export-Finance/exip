import companiesHouseRules from './rules';
import { CompanyHouseResponse } from '../../../../../../../types';

/**
 * validates company house API response
 * throws validation errors if success is false or apiError is flagged or if responseBody is null
 * @param responseBody containing an object with the companies house API response
 * @returns object containing errors or blank object
 */
const validation = (responseBody: CompanyHouseResponse) => {
  let errors!: object;

  for (let i = 0; i < companiesHouseRules.length; i += 1) {
    errors = companiesHouseRules[i](responseBody, errors);
  }

  return errors;
};

export default validation;
