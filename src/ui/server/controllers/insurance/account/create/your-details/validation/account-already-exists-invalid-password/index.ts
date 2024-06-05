import INSURANCE_FIELD_IDS from '../../../../../../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import generateValidationErrors from '../../../../../../../helpers/validation';
import { ValidationErrors } from '../../../../../../../../types';

const {
  ACCOUNT: { EMAIL, PASSWORD },
} = INSURANCE_FIELD_IDS;

const {
  ACCOUNT: {
    CREATE: { YOUR_DETAILS: ERROR_MESSAGES_OBJECT },
  },
} = ERROR_MESSAGES.INSURANCE;

/**
 * accountAlreadyExistsInvalidPasswordValidation
 * Generate an error count, error list and summary for GOV design errors.
 * @returns {ValidationErrors} Error count, error list and summary
 */
const accountAlreadyExistsInvalidPasswordValidation = (): ValidationErrors => {
  const emailError = generateValidationErrors(EMAIL, ERROR_MESSAGES_OBJECT[EMAIL].ACCOUNT_ALREADY_EXISTS_INCORRECT, {});

  const emailAndPasswordError = generateValidationErrors(PASSWORD, ERROR_MESSAGES_OBJECT[PASSWORD].ACCOUNT_ALREADY_EXISTS_INCORRECT, emailError);

  return emailAndPasswordError;
};

export default accountAlreadyExistsInvalidPasswordValidation;
