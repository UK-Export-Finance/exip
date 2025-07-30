import generateValidationErrors from '../../helpers/validation';
import { isBelowMinLength } from '../../helpers/string';
import { ValidationErrors } from '../../../types';

/**
 * Validates a field value is not below a minimum length
 * @param {string} fieldValue: Field value to validate
 * @param {string} fieldId: Field ID
 * @param {string} errorMessage: Error message
 * @param {object} errors: Errors object from previous validation errors
 * @param {number} minimum: Minimum allowed length
 * @returns {object} errors
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
