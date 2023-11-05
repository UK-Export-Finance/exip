import emptyFieldValidation from '../empty-field';
import { RequestBody } from '../../../types';

/**
 * nameValidation
 * Check if an nameField is empty
 * Returns generateValidationErrors if there are any errors.
 * @param {RequestBody} formBody
 * @param {String} fieldId
 * @param {String} errorMessage message
 * @param {Object} errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const nameValidation = (formBody: RequestBody, fieldId: string, errorMessage: string, errors: object) =>
  emptyFieldValidation(formBody, fieldId, errorMessage, errors);

export default nameValidation;
