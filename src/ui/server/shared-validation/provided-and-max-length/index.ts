import { objectHasProperty } from '../../helpers/object';
import maxLengthValidation from '../max-length';
import emptyFieldValidation from '../empty-field';
import { RequestBody, ErrorMessageObject } from '../../../types';

/**
 * providedAndMaxLength
 * Check if a field is:
 * 1) Provided
 * 2) Is not over a maximum length
 * Returns generateValidationErrors if there are any errors.
 * @param {RequestBody} formBody: Form body
 * @param {String} fieldId: Field ID
 * @param {String} errorMessage: Error message message
 * @param {Object} errors: Object from previous validation errors
 * @returns {Object} Validation errors
 */
const providedAndMaxLength = (formBody: RequestBody, fieldId: string, errorMessages: ErrorMessageObject, errors: object, maxLength: number) => {
  if (!objectHasProperty(formBody, fieldId)) {
    return emptyFieldValidation(formBody, fieldId, errorMessages.IS_EMPTY, errors);
  }

  return maxLengthValidation(formBody[fieldId], fieldId, errorMessages.ABOVE_MAXIMUM, errors, maxLength);
};

export default providedAndMaxLength;
