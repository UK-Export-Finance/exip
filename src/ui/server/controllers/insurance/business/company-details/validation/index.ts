import validationRules from './rules';
import { RequestBody, ValidationErrors } from '../../../../../../types';
import combineValidationRules from '../../../../../helpers/combine-validation-rules';

/**
 * validates company details page response
 * throws validation errors if any fields are not completed or incorrectly completed
 * @param {RequestBody} formBody: Form body
 * @returns {object} Errors or empty object
 */
const validation = (formBody: RequestBody): ValidationErrors => combineValidationRules(validationRules, formBody) as ValidationErrors;

export default validation;
