import Joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';
import { ACCOUNT } from '../../constants';
import generateValidationErrors from '../../helpers/validation';

const JoiPassword = Joi.extend(joiPasswordExtendCore);

const { MIN_LENGTH, MIN_LOWERCASE, MIN_UPPERCASE, MIN_NUMERIC, MIN_SPECIAL_CHARACTERS } = ACCOUNT.PASSWORD;

/**
 * passwordValidation
 * Check if an password is valid
 * Returns generateValidationErrors if there are any errors.
 * @param {String} Field ID
 * @param {String} Password
 * @param {String} Error message
 * @param {Object} Errors object from previous validation errors
 * @returns {ValidationErrors}
 */
const passwordValidation = (fieldId: string, password: string, errorMessage: string, errors: object) => {
  try {
    if (!password) {
      return generateValidationErrors(fieldId, errorMessage, errors);
    }

    if (password.length < MIN_LENGTH) {
      return generateValidationErrors(fieldId, errorMessage, errors);
    }

    const schema = Joi.object({
      username: Joi.string().min(5).max(200).required(),
      password: JoiPassword.string()
        .minOfSpecialCharacters(MIN_SPECIAL_CHARACTERS)
        .minOfLowercase(MIN_LOWERCASE)
        .minOfUppercase(MIN_UPPERCASE)
        .minOfNumeric(MIN_NUMERIC)
        .noWhiteSpaces()
        .required(),
    });

    // joi-password requires username to be passed.
    // We do not have usernames so we pass a mock value instead.
    const validation = schema.validate({ username: 'username', password });

    if (validation.error) {
      return generateValidationErrors(fieldId, errorMessage, errors);
    }
  } catch (err) {
    return errors;
  }

  return errors;
};

export default passwordValidation;
