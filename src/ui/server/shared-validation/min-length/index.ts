import generateValidationErrors from '../../helpers/validation';
import { isBelowMinLength } from '../../helpers/string';
import { ValidationErrors } from '../../../types';

/**
 * Validates a field value is not below a minimum length
 * @param {String} fieldValue: Field value to validate
 * @param {String} fieldId: Field ID
 * @param {String} errorMessage: Error message
 * @param {Object} errors: Errors object from previous validation errors
 * @param {Integer} minimum: Minimum allowed length
 * @returns {Object} errors
 */
const minLengthValidation = (fieldValue: string, fieldId: string, errorMessage: string, errors: object, minimum: number): ValidationErrors => {
  let updatedErrors = errors;

  if (isBelowMinLength(fieldValue, minimum)) {
    updatedErrors = generateValidationErrors(fieldId, errorMessage, updatedErrors);

    return updatedErrors;
  }

  return updatedErrors;
};

export default minLengthValidation;
