import Joi from 'joi';
import generateValidationErrors from '../../helpers/validation';
import maxLengthValidation from '../max-length';
import { ErrorMessageObject } from '../../../types';

export const MAXIMUM = 300;

/**
 * emailValidation
 * Check if an email is valid and not over a maximum length.
 * Returns generateValidationErrors if there are any errors.
 * @param {String} fieldId: Field ID
 * @param {String} email: Email
 * @param {Object} errorMessages: Error messages
 * @param {Object} errors: Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const emailValidation = (fieldId: string, email: string, errorMessages: ErrorMessageObject, errors: object) => {
  try {
    if (!email) {
      const errorMessage = errorMessages.IS_EMPTY || errorMessages.INCORRECT_FORMAT;

      return generateValidationErrors(fieldId, errorMessage, errors);
    }

    /**
     * Ignore the length in Joi validation,
     * Joi maximum length is below our MAXIMUM definition.
     */
    const schema = Joi.string().email({
      ignoreLength: true,
    });

    const validation = schema.validate(email);

    if (validation.error) {
      return generateValidationErrors(fieldId, errorMessages.INCORRECT_FORMAT, errors);
    }

    return maxLengthValidation(email, fieldId, errorMessages.ABOVE_MAXIMUM, errors, MAXIMUM);
  } catch (err) {
    return errors;
  }
};

export default emailValidation;
