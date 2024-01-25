import Joi from 'joi';
import generateValidationErrors from '../../helpers/validation';

/**
 * alphaCharactersOnlyValidation
 * Check that a string contains only alpha characters
 * @param {String} fieldValue: Field value to assert
 * @param {String} fieldId: Field ID
 * @param {String} errorMessage: Error message to use if invalid
 * @param {Object} Validation errors
 * @returns {Object | Boolean} Validation errors
 */
const alphaCharactersOnlyValidation = (fieldValue: string, fieldId: string, errorMessage: string, errors: object) => {
  const joiString = Joi.string();

  /**
   * Regex that allows only
   * - a-z or A-Z characters.
   * - an empty space.
   */
  // const regex = new RegExp(/^[a-zA-Z ]*$/);
  const regex = /^[a-zA-Z ]*$/;

  const schema = () => joiString.regex(regex).required();

  const validation = schema().validate(fieldValue);

  if (validation.error) {
    return generateValidationErrors(fieldId, errorMessage, errors);
  }

  return false;
};

export default alphaCharactersOnlyValidation;
