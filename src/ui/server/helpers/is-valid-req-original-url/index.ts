import Joi from 'joi';
import { REGEX } from '../../constants';

/**
 * Checks if the provided original URL is valid.
 * checks against NUMBER_ALPHA_HYPHEN_DASH_QUESTION_EQUALS_AND regex
 * if error on validation, returns false
 * otherwise, return true
 * @param {string} originalUrl - The original URL to validate.
 * @returns {Boolean}
 */
const isValidReqOriginalUrl = (originalUrl: string) => {
  const joiString = Joi.string();

  const schema = () => joiString.regex(REGEX.VALID_REQUEST_ORIGINAL_URL).required();

  const validation = schema().validate(originalUrl);

  return !validation.error;
};

export default isValidReqOriginalUrl;
