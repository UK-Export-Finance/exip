import FIELD_IDS from '../../../../../../../../constants/field-ids/insurance/account';
import { ERROR_MESSAGES } from '../../../../../../../../content-strings';
import generateValidationErrors from '../../../../../../../../helpers/validation';
import { ValidationErrors } from '../../../../../../../../../types';

const { EMAIL } = FIELD_IDS;

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
const accountAlreadyExistsAlreadyVerifiedValidation = (): ValidationErrors => generateValidationErrors(EMAIL, ERROR_MESSAGES_OBJECT.ACCOUNT_ALREADY_EXISTS, {});

export default accountAlreadyExistsAlreadyVerifiedValidation;
