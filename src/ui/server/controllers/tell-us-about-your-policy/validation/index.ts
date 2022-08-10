import validationRules from './rules';
import { SubmittedData } from '../../../../types';


const validation = (submittedData: SubmittedData) => {
  let errors!: object;

  for (let i = 0; i < validationRules.length; i += 1) {
    errors = validationRules[i](submittedData, errors);
  }

  return errors;
};

export default validation;
