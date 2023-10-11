import contactRules from './rules';
import { RequestBody, ValidationErrors } from '../../../../../../types';
import combineValidationRules from '../../../../../helpers/combine-validation-rules';

const validation = (formBody: RequestBody): ValidationErrors => combineValidationRules(contactRules, formBody) as ValidationErrors;

export default validation;
