import validationRules from './rules';
import combineValidationRules from '../../../../helpers/combine-validation-rules';
import { RequestBody } from '../../../../../types';

const validation = (formBody: RequestBody) => combineValidationRules(validationRules, formBody);

export default validation;
