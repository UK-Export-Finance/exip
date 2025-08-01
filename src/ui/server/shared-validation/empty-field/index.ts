import generateValidationErrors from '../../helpers/validation';
import { objectHasProperty } from '../../helpers/object';
import { RequestBody } from '../../../types';

/**
 * emptyFieldValidation
 * Check if a field has been provided in form body
 * Returns generateValidationErrors if there are any errors.
 * @param {RequestBody} formBody: Form body
 * @param {string} fieldId: Field ID
 * @param {string} errorMessage: Error message
 * @param {object} errors: Errors object from previous validation errors
 * @returns {ValidationErrors}
 */
const emptyFieldValidation = (formBody: RequestBody, fieldId: string, errorMessage: string, errors: object) => {
  if (!objectHasProperty(formBody, fieldId)) {
    return generateValidationErrors(fieldId, errorMessage, errors);
  }

  return errors;
};

export default emptyFieldValidation;
