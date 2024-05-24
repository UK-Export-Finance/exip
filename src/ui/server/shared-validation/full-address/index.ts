import { MAXIMUM_CHARACTERS } from '../../constants';
import providedAndMaxLength from '../provided-and-max-length';
import { RequestBody, ErrorMessageObject } from '../../../types';

/**
 * fullAddress
 * Check validation for a "full address" field.
 * 1) Provided
 * 2) Is not over a maximum length
 * Returns generateValidationErrors if there are any errors.
 * @param {RequestBody} formBody: Form body
 * @param {String} fieldId: Field ID
 * @param {String} errorMessage: Error message message
 * @param {Object} errors: Other validation errors for the same form
 * @returns {ValidationErrors} providedAndMaxLength
 */
const fullAddress = (formBody: RequestBody, fieldId: string, errorMessages: ErrorMessageObject, errors: object) =>
  providedAndMaxLength(formBody, fieldId, errorMessages, errors, MAXIMUM_CHARACTERS.FULL_ADDRESS);

export default fullAddress;
