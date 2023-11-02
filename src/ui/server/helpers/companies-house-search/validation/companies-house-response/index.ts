import validationRules from './rules';
import combineValidationRules from '../../../combine-validation-rules';
import { CompaniesHouseResponse, ValidationErrors } from '../../../../../types';

/**
 * Validates companies house API response
 * Throws validation errors if success is false or apiError is flagged or if responseBody is null
 * @param {Object} Companies house API response
 * @returns Object containing errors or blank object
 */
const validation = (responseBody: CompaniesHouseResponse) => combineValidationRules(validationRules, responseBody) as ValidationErrors;

export default validation;
