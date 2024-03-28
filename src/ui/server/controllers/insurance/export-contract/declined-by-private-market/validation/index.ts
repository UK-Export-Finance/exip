import paymentTermsDescriptionRules from './rules';
import { RequestBody, ValidationErrors } from '../../../../../../types';
import combineValidationRules from '../../../../../helpers/combine-validation-rules';

const validation = (formBody: RequestBody): ValidationErrors => combineValidationRules(paymentTermsDescriptionRules, formBody) as ValidationErrors;

export default validation;
