import generateValidationErrors from '../../helpers/validation';
import { isAboveMaxLength } from '../../helpers/string';

/**
 * Validates a field value is not above a maximum length
 * @param {String} fieldValue: Field value to validate
 * @param {String} fieldId: Field ID
 * @param {String} errorMessage: Error message
 * @param {Object} errors: Errors object from previous validation errors
 * @param {Integer} maximum: Maximum allowed length
 * @returns {Object} errors
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
