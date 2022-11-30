import companiesHouseRules from './rules';
import { RequestBody } from '../../../../../../../types';

const validation = (formBody: RequestBody) => {
  let errors!: object;

  for (let i = 0; i < companiesHouseRules.length; i += 1) {
    errors = companiesHouseRules[i](formBody, errors);
  }

  return errors;
};

export default validation;
