import { objectHasProperty } from '../../helpers/object';
import alphaCharactersOnlyValidation from '../alpha-characters-only';
import maxLengthValidation from '../max-length';
import emptyFieldValidation from '../empty-field';
import { RequestBody, ErrorMessageObject } from '../../../types';

/**
 * alphaCharactersAndMaxLength
 * Check if a field is:
 * 1) Provided
 * 2) Has only alpha characters
 * 3) Is not over a maximum length
 * Returns generateValidationErrors if there are any errors.
 * @param {RequestBody} formBody: Form body
 * @param {string} fieldId: Field ID
 * @param {string} errorMessage: Error message message
 * @param {object} errors: Other validation errors for the same form
 * @param {number} maxLength: Maximum length of characters
 * @returns {ValidationErrors}
 */
const alphaCharactersAndMaxLength = (formBody: RequestBody, fieldId: string, errorMessages: ErrorMessageObject, errors: object, maxLength: number) => {
  if (!objectHasProperty(formBody, fieldId)) {
    return emptyFieldValidation(formBody, fieldId, errorMessages.IS_EMPTY, errors);
  }

  const alphaCharactersOnlyError = alphaCharactersOnlyValidation(formBody[fieldId], fieldId, errorMessages.INCORRECT_FORMAT, errors);

  if (alphaCharactersOnlyError) {
    return alphaCharactersOnlyError;
  }

  return maxLengthValidation(formBody[fieldId], fieldId, errorMessages.ABOVE_MAXIMUM, errors, maxLength);
};

export default alphaCharactersAndMaxLength;
