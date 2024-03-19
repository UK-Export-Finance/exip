import { REGEX } from '../../constants';
import generateValidationErrors from '../../helpers/validation';

/**
 * alphaNumericalCharactersOnlyValidation
 * Check that a string contains only alpha numerical characters. This function:
 * - Consumes 2x simple regexes with the string.match method
 * - Compares the length of the regex results VS the provided field value.
 * - If the lengths do NOT match, return validation errors.
 * The alternative to this approach is to have one extremely long regex.
 * @param {String} fieldValue: Field value to assert
 * @param {String} fieldId: Field ID
 * @param {String} errorMessage: Error message to use if invalid
 * @param {Object} Validation errors
 * @returns {Object | Boolean} Validation errors
 */
const alphaNumericalCharactersOnlyValidation = (fieldValue: string, fieldId: string, errorMessage: string, errors: object) => {
  /**
   * Check the string contains:
   * 1) Uppercase alpha characters
   * 2) numerical characters
   */
  const alphaCharacters = fieldValue.match(REGEX.INCLUDES_UPPERCASE_ALPHA_CHARACTERS);
  const numericalCharacters = fieldValue.match(REGEX.INCLUDES_NUMERICAL_CHARACTERS);

  /**
   * If the string contains alpha and numerical characters, generate a total length of these valid characters.
   * If this length does NOT match the total fieldValue length,
   * an invalid character has been provided, e.g an empty space or special character.
   * Anything other than an alpha or numerical character is invalid.
   */
  if (alphaCharacters && numericalCharacters) {
    const validCharactersLength = [...alphaCharacters[0], ...numericalCharacters[0]].length;

    if (validCharactersLength === fieldValue.length) {
      return false;
    }
  }

  /**
   * Otherwise, the provided fieldValue is invalid.
   * Return validation errors.
   */
  return generateValidationErrors(fieldId, errorMessage, errors);
};

export default alphaNumericalCharactersOnlyValidation;
