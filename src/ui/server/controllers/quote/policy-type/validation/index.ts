import validationRules from './rules';
import { RequestBody } from '../../../../../types';

const validation = (formBody: RequestBody) => {
  let errors!: object;

  validationRules.forEach((rule) => {
    errors = rule(formBody, errors);
  });

  return errors;
};

export default validation;
