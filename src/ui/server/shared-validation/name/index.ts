import { objectHasProperty } from '../../helpers/object';
import alphaCharactersOnlyValidation from '../alpha-characters-only';
import maxLengthValidation from '../max-length';
import emptyFieldValidation from '../empty-field';
import { ACCOUNT_FIELDS } from '../../content-strings/fields/insurance/account';
import { RequestBody, ErrorMessageObject } from '../../../types';

const {
  MAXIMUM: {
    NAME: { CHARACTERS: MAX_CHARACTERS },
  },
} = ACCOUNT_FIELDS;

/**
 * nameValidation
 * Check if a name field is valid.
 * Returns generateValidationErrors if there are any errors.
 * @param {RequestBody} formBody
 * @param {String} fieldId
 * @param {String} errorMessage message
 * @param {Object} errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const nameValidation = (formBody: RequestBody, fieldId: string, errorMessages: ErrorMessageObject, errors: object) => {
  if (!objectHasProperty(formBody, fieldId)) {
    return emptyFieldValidation(formBody, fieldId, errorMessages.IS_EMPTY, errors);
  }

  const alphaCharactersOnlyError = alphaCharactersOnlyValidation(formBody[fieldId], fieldId, errorMessages.INCORRECT_FORMAT, errors);

  if (alphaCharactersOnlyError) {
    return alphaCharactersOnlyError;
  }

  return maxLengthValidation(formBody[fieldId], fieldId, errorMessages.ABOVE_MAXIMUM, errors, MAX_CHARACTERS);
};

export default nameValidation;
