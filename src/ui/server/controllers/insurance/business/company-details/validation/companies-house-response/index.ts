import companiesHouseRules from './rules';
import { CompanyHouseResponse } from '../../../../../../../types';

const validation = (responseBody: CompanyHouseResponse) => {
  let errors!: object;

  for (let i = 0; i < companiesHouseRules.length; i += 1) {
    errors = companiesHouseRules[i](responseBody, errors);
  }

  return errors;
};

export default validation;
