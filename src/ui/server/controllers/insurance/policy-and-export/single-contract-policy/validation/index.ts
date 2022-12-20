import validationRules from './rules';
import { RequestBody, ValidationErrors } from '../../../../../../types';

const validation = (formBody: RequestBody): ValidationErrors => {
  let errors!: object;

  for (let i = 0; i < validationRules.length; i += 1) {
    errors = validationRules[i](formBody, errors);
  }

  return errors;
};

export default validation;
