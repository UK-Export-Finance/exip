import INSURANCE_FIELD_IDS from '../../../../../../../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../../../../../../../content-strings';
import generateValidationErrors from '../../../../../../../../helpers/validation';
import { ValidationErrors } from '../../../../../../../../../types';

const {
  ACCOUNT: { EMAIL, PASSWORD },
} = INSURANCE_FIELD_IDS;

const {
  ACCOUNT: {
    CREATE: { YOUR_DETAILS: ERROR_MESSAGES_OBJECT },
  },
} = ERROR_MESSAGES.INSURANCE;

/**
 * accountAlreadyExistsAlreadyVerifiedValidation
 * Generate an error count, error list and summary for GOV design errors.
 * @returns {ValidationErrors} Error count, error list and summary
 */
const accountAlreadyExistsAlreadyVerifiedValidation = (): ValidationErrors => {
  const emailError = generateValidationErrors(EMAIL, ERROR_MESSAGES_OBJECT.ACCOUNT_ALREADY_EXISTS, {});

  const emailAndPasswordError = generateValidationErrors(PASSWORD, ERROR_MESSAGES_OBJECT.ACCOUNT_ALREADY_EXISTS, emailError);

  return emailAndPasswordError;
};

export default accountAlreadyExistsAlreadyVerifiedValidation;
