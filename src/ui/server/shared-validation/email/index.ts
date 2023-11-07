import Joi from 'joi';
import generateValidationErrors from '../../helpers/validation';

/**
 * emailValidation
 * Check if an email is valid
 * Returns generateValidationErrors if there are any errors.
 * @param {String} Field ID
 * @param {String} Email
 * @param {String} Error message
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const emailValidation = (fieldId: string, email: string, errorMessage: string, errors: object) => {
  try {
    if (!email) {
      return generateValidationErrors(fieldId, errorMessage, errors);
    }

    const schema = Joi.string().email();

    const validation = schema.validate(email);

    if (validation.error) {
      return generateValidationErrors(fieldId, errorMessage, errors);
    }
  } catch (err) {
    return errors;
  }

  return errors;
};

export default emailValidation;
