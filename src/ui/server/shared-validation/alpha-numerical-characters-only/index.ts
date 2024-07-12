import Joi from 'joi';
import generateValidationErrors from '../../helpers/validation';
import { REGEX } from '../../constants';

/**
 * alphaNumericalCharactersOnlyValidation
 * Check that a string contains only alpha or alphanumerical characters or just alpha characters.
 * This function:
 * - Uses joi to check that the field value is an alphanumeric string
 * - Uses joi to check if the field value only contains numbers
 * - If the field values is not an alpha or alphanumberic string, or if the field value is only numbers, then returns an error
 * @param {String} fieldValue: Field value to assert
 * @param {String} fieldId: Field ID
 * @param {String} errorMessage: Error message to use if invalid
 * @param {Object} Validation errors
 * @returns {Object | Boolean} Validation errors
 */
const alphaNumericalCharactersOnlyValidation = (fieldValue: string, fieldId: string, errorMessage: string, errors: object) => {
  /**
   * Check the string contains:
   * 1) alpha characters
   * 2) alpha characters and numerical characters
   * 3) does not contain only numerical characters
   * 4) does not contain only special characters
   */
  const joiString = Joi.string();

  const alphaNumSchema = () => joiString.alphanum().required();
  const numbersOnlySchema = () => Joi.string().pattern(REGEX.NUMERICAL_CHARACTERS);

  const validationAlphaNum = alphaNumSchema().validate(fieldValue);
  const validationNumbersOnly = numbersOnlySchema().validate(fieldValue);

  /**
   * if the field value does not match the alpha numerical characters validation
   * or if the field value does not contain an error for only numerical values (string is numbers only)
   * then return generate and return validation errors
   */
  if (validationAlphaNum.error || !validationNumbersOnly.error) {
    return generateValidationErrors(fieldId, errorMessage, errors);
  }

  return false;
};

export default alphaNumericalCharactersOnlyValidation;
