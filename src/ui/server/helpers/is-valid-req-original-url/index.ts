import Joi from 'joi';
import { REGEX } from '../../constants';

/**
 * Checks if the provided original URL is valid.
 * checks against NUMBER_ALPHA_HYPHEN_DASH_QUESTION_EQUALS_AND regex
 * if error on validation, returns false
 * returns true if valid
 * @param {string} originalUrl - The original URL to validate.
 * @returns {Boolean}
 */
const isValidReqOriginalUrl = (originalUrl: string) => {
  const joiString = Joi.string();

  const schema = () => joiString.regex(REGEX.ALPHA_NUMBER_HYPHEN_DASH_QUESTION_EQUALS_AMPERSAND).required();

  const validation = schema().validate(originalUrl);

  return !validation.error;
};

export default isValidReqOriginalUrl;
