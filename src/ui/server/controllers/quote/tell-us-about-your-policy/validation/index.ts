import validationRules from './rules';
import { SubmittedDataQuoteEligibility } from '../../../../../types';

const validation = (submittedData: SubmittedDataQuoteEligibility) => {
  let errors!: object;

  validationRules.forEach((rule) => {
    errors = rule(submittedData, errors);
  });

  return errors;
};

export default validation;
