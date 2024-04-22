import FIELD_IDS from '../../../../../../constants/field-ids/insurance/account';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import emailValidation from '../../../../../../shared-validation/email';
import { RequestBody } from '../../../../../../../types';

const { EMAIL: FIELD_ID } = FIELD_IDS;

const {
  ACCOUNT: {
    PASSWORD_RESET: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
  },
} = ERROR_MESSAGES.INSURANCE;

/**
 * emailRules
 * Returns emailValidation
 * @param {RequestBody} formBody: Form body
 * @param {Object} Errors object from previous validation errors
 * @returns {ValidationErrors}
 */
const emailRules = (formBody: RequestBody, errors: object) => {
  const fieldValue = formBody[FIELD_ID];

  return emailValidation(FIELD_ID, fieldValue, ERROR_MESSAGES_OBJECT, errors);
};

export default emailRules;
