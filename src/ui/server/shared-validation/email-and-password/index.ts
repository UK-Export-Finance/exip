import { objectHasProperty } from '../../helpers/object';
import generateValidationErrors from '../../helpers/validation';
import INSURANCE_FIELD_IDS from '../../constants/field-ids/insurance';
import { RequestBody } from '../../../types';

const {
  ACCOUNT: { EMAIL, PASSWORD },
} = INSURANCE_FIELD_IDS;

/**
 * emailAndPasswordValidation
 * Check if both an email and password provided.
 * If not, return a validation error for both fields.
 * @param {Express.Response.body} Express response body
 * @param {String} Field ID
 * @param {String} Error message
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const emailAndPasswordValidation = (formBody: RequestBody, fieldId: string, errorMessage: string, errors: object) => {
  if (!objectHasProperty(formBody, EMAIL) || !objectHasProperty(formBody, PASSWORD)) {
    return generateValidationErrors(fieldId, errorMessage, errors);
  }

  return errors;
};

export default emailAndPasswordValidation;
