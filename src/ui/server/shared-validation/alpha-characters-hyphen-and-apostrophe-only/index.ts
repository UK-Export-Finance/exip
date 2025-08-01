import { REGEX } from '../../constants';
import regexValidation from '../regex-validation';

/**
 * alphaCharactersHyphenAndApostropheOnlyValidation
 * Check that a string contains only alpha characters, spaces, hyphens or apostrophes
 * @param {string} fieldValue: Field value to assert
 * @param {string} fieldId: Field ID
 * @param {string} errorMessage: Error message to use if invalid
 * @param {object} errors: Validation errors
 * @returns {Object | Boolean} Validation errors
 */
const alphaCharactersHyphenAndApostropheOnlyValidation = (fieldValue: string, fieldId: string, errorMessage: string, errors: object) =>
  regexValidation(fieldValue, fieldId, REGEX.ALPHA_CHARACTERS_AND_SPACE_HYPHEN_APOSTROPHE, errorMessage, errors);

export default alphaCharactersHyphenAndApostropheOnlyValidation;
