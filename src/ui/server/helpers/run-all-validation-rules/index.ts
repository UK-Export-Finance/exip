import { ValidationErrors } from '../../../types';

const runAndCombineAllValidationRules = (rules: any, data: any, errorObject: object) => {
  let errors = errorObject;

  rules.forEach((rule) => {
    errors = rule(data, errors);
  });

  return errors;
};

export default runAndCombineAllValidationRules;