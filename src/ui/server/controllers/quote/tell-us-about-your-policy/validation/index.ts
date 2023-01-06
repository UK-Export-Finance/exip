import validationRules from './rules';
import combineValidationRules from '../../../../helpers/combine-validation-rules';
import { SubmittedDataQuoteEligibility, ValidationErrors } from '../../../../../types';

const validation = (submittedData: SubmittedDataQuoteEligibility) => combineValidationRules(validationRules, submittedData) as ValidationErrors;

export default validation;
