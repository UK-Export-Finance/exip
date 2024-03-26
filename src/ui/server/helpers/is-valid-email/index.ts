import Joi from 'joi';

/**
 * isValidEmail
 * Check if an email is valid.
 * @param {String} email
 * @returns {Boolean}
 */
const isValidEmail = (email: string) => {
  /**
   * Ignore the length in Joi validation,
   * Joi maximum length is handled in other validation functions,
   * by using the MAXIMUM_CHARACTERS.EMAIL definition.
   */
  const schema = Joi.string().email({
    ignoreLength: true,
  });

  const validation = schema.validate(email);

  if (validation.error) {
    return false;
  }

  return true;
};

export default isValidEmail;
