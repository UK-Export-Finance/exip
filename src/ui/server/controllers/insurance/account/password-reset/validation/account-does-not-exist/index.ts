import INSURANCE_FIELD_IDS from '../../../../../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import generateValidationErrors from '../../../../../../helpers/validation';
import { ValidationErrors } from '../../../../../../../types';

const {
  ACCOUNT: { EMAIL },
} = INSURANCE_FIELD_IDS;

const {
  ACCOUNT: {
    PASSWORD_RESET: {
      [EMAIL]: { ACCOUNT_DOES_NOT_EXIST: ERROR_MESSAGE },
    },
  },
} = ERROR_MESSAGES.INSURANCE;

/**
 * accountDoesNotExistValidation
 * Generate an error count, error list and summary for GOV design errors.
 * @returns {ValidationErrors} Error count, error list and summary
 */
const accountDoesNotExistValidation = (): ValidationErrors => generateValidationErrors(EMAIL, ERROR_MESSAGE);

export default accountDoesNotExistValidation;
