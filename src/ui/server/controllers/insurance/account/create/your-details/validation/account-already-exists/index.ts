import INSURANCE_FIELD_IDS from '../../../../../../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import generateValidationErrors from '../../../../../../../helpers/validation';
import { ValidationErrors } from '../../../../../../../../types';

const {
  ACCOUNT: { EMAIL },
} = INSURANCE_FIELD_IDS;

const {
  ACCOUNT: {
    CREATE: {
      YOUR_DETAILS: {
        [EMAIL]: { ACCOUNT_ALREADY_EXISTS: ERROR_MESSAGE },
      },
    },
  },
} = ERROR_MESSAGES.INSURANCE;

/**
 * accountAlreadyExistsValidation
 * Generate an error count, error list and summary for GOV design errors.
 * @returns {ValidationErrors} Error count, error list and summary
 */
const accountAlreadyExistsValidation = (): ValidationErrors => generateValidationErrors(EMAIL, ERROR_MESSAGE);

export default accountAlreadyExistsValidation;
