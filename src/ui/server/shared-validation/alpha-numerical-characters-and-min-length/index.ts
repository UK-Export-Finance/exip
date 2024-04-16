import { objectHasProperty } from '../../helpers/object';
import alphaNumericalCharactersOnlyValidation from '../alpha-numerical-characters-only';
import minLengthValidation from '../min-length';
import emptyFieldValidation from '../empty-field';
import { RequestBody, ErrorMessageObject } from '../../../types';

/**
 * alphaNumericalCharactersAndMinLength
 * Check if a field is:
 * 1) Provided
 * 2) Has only alpha characters
 * 3) Is not below a minimum length
 * Returns generateValidationErrors if there are any errors.
 * @param {RequestBody} formBody: Form body
 * @param {String} fieldId: Field ID
 * @param {String} errorMessage: Error message message
 * @param {Object} errors: Other validation errors for the same form
 * @param {Integer} minLength: Minimum length of characters
 * @returns {ValidationErrors} Validation errors
 */
const alphaNumericalCharactersAndMinLength = (formBody: RequestBody, fieldId: string, errorMessages: ErrorMessageObject, errors: object, minLength: number) => {
  if (!objectHasProperty(formBody, fieldId)) {
    return emptyFieldValidation(formBody, fieldId, errorMessages.IS_EMPTY, errors);
  }

  const alphaCharactersOnlyError = alphaNumericalCharactersOnlyValidation(formBody[fieldId], fieldId, errorMessages.INCORRECT_FORMAT, errors);

  if (alphaCharactersOnlyError) {
    return alphaCharactersOnlyError;
  }

  return minLengthValidation(formBody[fieldId], fieldId, errorMessages.BELOW_MINIMUM, errors, minLength);
};

export default alphaNumericalCharactersAndMinLength;
