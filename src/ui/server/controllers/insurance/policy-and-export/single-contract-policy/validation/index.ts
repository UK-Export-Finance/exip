import validationRules from './rules';
import { RequestBody, ValidationErrors } from '../../../../../../types';

const validation = (formBody: RequestBody): ValidationErrors => {
  let errors!: object;

  validationRules.forEach((rule) => {
    errors = rule(formBody, errors);
  });

  return errors;
};

export default validation;
