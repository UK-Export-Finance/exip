import { RequestBody, ValidationErrors } from '../../../../../../types';
import combineValidationRules from '../../../../../helpers/combine-validation-rules';
import validationRules from './rules';

const buyerFinancialInformationValidation = (formBody: RequestBody): ValidationErrors => combineValidationRules(validationRules, formBody);

export default buyerFinancialInformationValidation;
