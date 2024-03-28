import FIELD_IDS from '../../../../../../constants/field-ids/insurance/account';
import { objectHasProperty } from '../../../../../../helpers/object';
import emailAndPasswordValidation from '../../../../../../shared-validation/email-and-password-incorrect';
import { RequestBody } from '../../../../../../../types';

const { PASSWORD: FIELD_ID } = FIELD_IDS;

/**
 * passwordRules
 * Validate the password.
 * If the password is empty, return emailAndPasswordValidation.
 * This ensures that a validation error is returned for both EMIL and PASSWORD,
 * to indicate to a user that the credentials are invalid.
 * @param {RequestBody} formBody: Form body
 * @param {Object} Errors object from previous validation errors
 * @returns {Function} emailAndPasswordValidation
 */
const passwordRules = (formBody: RequestBody, errors: object) => {
  if (!objectHasProperty(formBody, FIELD_ID)) {
    return emailAndPasswordValidation(errors);
  }

  return errors;
};

export default passwordRules;
