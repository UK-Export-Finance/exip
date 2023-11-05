import companyDetailsResponseRules from './rules';
import { RequestBody, ValidationErrors } from '../../../../../../../types';
import combineValidationRules from '../../../../../../helpers/combine-validation-rules';

/**
 * validates company details page response
 * throws validation errors if any fields are not completed or incorrectly completed
 * @param {Express.Request.body} responseBody containing an object with the company details response body
 * @returns {object} object containing errors or blank object
 */
const validation = (formBody: RequestBody): ValidationErrors => combineValidationRules(companyDetailsResponseRules, formBody) as ValidationErrors;

export default validation;
