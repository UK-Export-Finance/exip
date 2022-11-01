import validationRules from './rules';
import { SubmittedDataQuoteEligibility } from '../../../../../types';

const validation = (submittedData: SubmittedDataQuoteEligibility) => {
  let errors!: object;

  for (let i = 0; i < validationRules.length; i += 1) {
    errors = validationRules[i](submittedData, errors);
  }

  return errors;
};

export default validation;
