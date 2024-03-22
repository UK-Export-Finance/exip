import { MAXIMUM_CHARACTERS } from '../../constants';
import generateValidationErrors from '../../helpers/validation';
import isValidEmail from '../../helpers/is-valid-email';
import maxLengthValidation from '../max-length';
import { ErrorMessageObject } from '../../../types';

/**
 * emailValidation
 * Check if an email is valid and not over a maximum length.
 * Returns generateValidationErrors if there are any errors.
 * @param {String} fieldId: Field ID
 * @param {String} email: Email
 * @param {Object} errorMessages: Error messages
 * @param {Object} errors: Other validation errors for the same form
 * @returns {Object} Validation errors
 */
const emailValidation = (fieldId: string, email: string, errorMessages: ErrorMessageObject, errors: object) => {
  try {
    if (!email) {
      const errorMessage = errorMessages.IS_EMPTY;

      return generateValidationErrors(fieldId, errorMessage, errors);
    }

    if (!isValidEmail(email)) {
      return generateValidationErrors(fieldId, errorMessages.INCORRECT_FORMAT, errors);
    }

    return maxLengthValidation(email, fieldId, errorMessages.ABOVE_MAXIMUM, errors, MAXIMUM_CHARACTERS.EMAIL);
  } catch (err) {
    return errors;
  }
};

export default emailValidation;
