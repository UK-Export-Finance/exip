import validationRules from './rules';
import combineValidationRules from '../../combine-validation-rules';
import { RequestBody, ValidationErrors } from '../../../../types';

/**
 * validates formBody for entered companies house number
 * throws validation errors if incorrect format
 * @param formBody containing an object with the requestBody containing the companies house number input
 * @returns object containing errors or blank object
 */
const validation = (formBody: RequestBody) => combineValidationRules(validationRules, formBody) as ValidationErrors;

export default validation;
