import validationRules from './rules';
import { RequestBody } from '../../../../../types';

const validation = (formBody: RequestBody) => {
  let errors!: object;

  for (let i = 0; i < validationRules.length; i += 1) {
    errors = validationRules[i](formBody, errors);
  }

  return errors;
};

export default validation;
