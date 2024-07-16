import { REGEX } from '../../constants';
import regexValidation from '../regex-validation';

/**
 * alphaCharactersOnlyValidation
 * Check that a string contains only alpha characters
 * @param {String} fieldValue: Field value to assert
 * @param {String} fieldId: Field ID
 * @param {String} errorMessage: Error message to use if invalid
 * @param {Object} Validation errors
 * @returns {Object | Boolean} Validation errors
 */
const alphaCharactersOnlyValidation = (fieldValue: string, fieldId: string, errorMessage: string, errors: object) =>
  regexValidation(fieldValue, fieldId, REGEX.ALPHA_CHARACTERS_AND_SPACE, errorMessage, errors);

export default alphaCharactersOnlyValidation;
