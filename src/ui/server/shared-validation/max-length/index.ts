import generateValidationErrors from '../../helpers/validation';
import { isAboveMaxLength } from '../../helpers/string';

/**
 * Validates a field value is not above a maximum length
 * @param {string} fieldValue: Field value to validate
 * @param {string} fieldId: Field ID
 * @param {string} errorMessage: Error message
 * @param {object} errors: Errors object from previous validation errors
 * @param {number} maximum: Maximum allowed length
 * @returns {object} errors
 */
const maxLengthValidation = (fieldValue: string, fieldId: string, errorMessage: string, errors: object, maximum: number) => {
  let updatedErrors = errors;

  if (isAboveMaxLength(fieldValue, maximum)) {
    updatedErrors = generateValidationErrors(fieldId, errorMessage, updatedErrors);

    return updatedErrors;
  }

  return updatedErrors;
};

export default maxLengthValidation;
