import alphaCharactersHyphenAndApostropheOnlyValidation from '../alpha-characters-hyphen-and-apostrophe-only';
import { objectHasProperty } from '../../helpers/object';
import maxLengthValidation from '../max-length';
import emptyFieldValidation from '../empty-field';
import { MAXIMUM_CHARACTERS } from '../../constants';
import { RequestBody, ErrorMessageObject } from '../../../types';

const { ACCOUNT } = MAXIMUM_CHARACTERS;

/**
 * nameValidation
 * Check if a name field is valid.
 * Returns alphaCharactersAndMaxLength.
 * @param {RequestBody} formBody
 * @param {String} fieldId
 * @param {String} errorMessage message
 * @param {Object} errors object from previous validation errors
 * @param {Number} maximum length of name - default to ACCOUNT.NAME value
 * @returns {ValidationErrors}
 */
const nameValidation = (formBody: RequestBody, fieldId: string, errorMessages: ErrorMessageObject, errors: object, maximum = ACCOUNT.NAME) => {
  if (!objectHasProperty(formBody, fieldId)) {
    return emptyFieldValidation(formBody, fieldId, errorMessages.IS_EMPTY, errors);
  }

  const alphaCharactersOnlyError = alphaCharactersHyphenAndApostropheOnlyValidation(formBody[fieldId], fieldId, errorMessages.INCORRECT_FORMAT, errors);

  if (alphaCharactersOnlyError) {
    return alphaCharactersOnlyError;
  }

  return maxLengthValidation(formBody[fieldId], fieldId, errorMessages.ABOVE_MAXIMUM, errors, maximum);
};

export default nameValidation;
