import lossPayeeFinancialInternationalRules from './rules';
import { RequestBody, ValidationErrors } from '../../../../../../types';
import combineValidationRules from '../../../../../helpers/combine-validation-rules';

const validation = (formBody: RequestBody): ValidationErrors => combineValidationRules(lossPayeeFinancialInternationalRules, formBody) as ValidationErrors;

export default validation;
