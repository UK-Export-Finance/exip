import lossPayeeFinancialUkRules from './rules';
import combineValidationRules from '../../../../../helpers/combine-validation-rules';
import { RequestBody, ValidationErrors } from '../../../../../../types';

const validation = (formBody: RequestBody): ValidationErrors => combineValidationRules(lossPayeeFinancialUkRules, formBody) as ValidationErrors;

export default validation;
