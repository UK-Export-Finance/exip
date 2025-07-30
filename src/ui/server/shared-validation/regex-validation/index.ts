import Joi from 'joi';
import generateValidationErrors from '../../helpers/validation';

/**
 * regexValidation
 * Check that a string matches a regex pattern
 * @param {string} fieldValue: Field value to assert
 * @param {string} fieldId: Field ID
 * @param {RegExp} regex: regex expression to match
 * @param {string} errorMessage: Error message to use if invalid
 * @param {object} errors: Validation errors
 * @returns {Object | Boolean} Validation errors
 */
const regexValidation = (fieldValue: string, fieldId: string, regex: RegExp, errorMessage: string, errors: object) => {
  const joiString = Joi.string();

  const schema = () => joiString.regex(regex).required();

  const validation = schema().validate(fieldValue);

  if (validation.error) {
    return generateValidationErrors(fieldId, errorMessage, errors);
  }

  return false;
};

export default regexValidation;
