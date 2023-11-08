import validationRules from './rules';
import combineValidationRules from '../../../combine-validation-rules';
import { CompanyHouseResponse, ValidationErrors } from '../../../../../types';

/**
 * Validates company house API response
 * Throws validation errors if success is false or apiError is flagged or if responseBody is null
 * @param {Object} Companies house API response
 * @returns Object containing errors or blank object
 */
const validation = (responseBody: CompanyHouseResponse) => combineValidationRules(validationRules, responseBody) as ValidationErrors;

export default validation;
