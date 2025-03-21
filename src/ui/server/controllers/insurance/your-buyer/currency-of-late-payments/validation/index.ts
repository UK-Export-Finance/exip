import combineValidationRules from '../../../../../helpers/combine-validation-rules';
import validationRules from './rules';
import { RequestBody, ValidationErrors } from '../../../../../../types';

const currencyOfLatePaymentsValidation = (formBody: RequestBody): ValidationErrors => combineValidationRules(validationRules, formBody);

export default currencyOfLatePaymentsValidation;
