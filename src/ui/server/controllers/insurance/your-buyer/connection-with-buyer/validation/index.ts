import { RequestBody, ValidationErrors } from '../../../../../../types';
import combineValidationRules from '../../../../../helpers/combine-validation-rules';
import validationRules from './rules';

const connectionWithBuyerValidation = (formBody: RequestBody): ValidationErrors => combineValidationRules(validationRules, formBody);

export default connectionWithBuyerValidation;
