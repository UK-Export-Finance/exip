import generateValidationErrors from '../../helpers/validation';
import isAboveMaxLength from '../../helpers/is-above-max-length';

/**
 * validates field character count input is not above max length
 * @param {string} fieldBody
 * @param {string} fieldId
 * @param {string} errorMessage
 * @param {object} errors
 * @param {number} maximum
 * @returns {object} errors
 */
const validateInputMaxLength = (fieldBody: string, fieldId: string, errorMessage: string, errors: object, maximum: number) => {
  let updatedErrors = errors;

  // is over maximum number of characters then will be false
  if (isAboveMaxLength(fieldBody, maximum)) {
    updatedErrors = generateValidationErrors(fieldId, errorMessage, updatedErrors);

    return updatedErrors;
  }

  return updatedErrors;
};

export default validateInputMaxLength;
