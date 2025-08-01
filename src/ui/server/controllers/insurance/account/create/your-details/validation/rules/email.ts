import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/account';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import emailValidation from '../../../../../../../shared-validation/email';
import { RequestBody } from '../../../../../../../../types';

const { EMAIL: FIELD_ID } = FIELD_IDS;

const {
  ACCOUNT: {
    CREATE: {
      YOUR_DETAILS: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
    },
  },
} = ERROR_MESSAGES.INSURANCE;

/**
 * emailRules
 * Check submitted form data for errors with the email field
 * Returns generateValidationErrors if there are any errors.
 * @param {RequestBody} formBody: Form body
 * @param {object} errors: Errors from previous validation errors
 * @returns {ValidationErrors}
 */
const emailRules = (formBody: RequestBody, errors: object) => {
  const fieldValue = formBody[FIELD_ID];

  return emailValidation(FIELD_ID, fieldValue, ERROR_MESSAGES_OBJECT, errors);
};

export default emailRules;
