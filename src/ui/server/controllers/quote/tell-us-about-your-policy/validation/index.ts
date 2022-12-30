import validationRules from './rules';
import combineValidationRules from '../../../../helpers/combine-validation-rules';
import { SubmittedDataQuoteEligibility } from '../../../../../types';

const validation = (submittedData: SubmittedDataQuoteEligibility) => combineValidationRules(validationRules, submittedData);

export default validation;
