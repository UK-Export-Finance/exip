import INSURANCE_FIELD_IDS from '../../../../../../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import generateValidationErrors from '../../../../../../../helpers/validation';
import { ValidationErrors } from '../../../../../../../../types';

const {
  ACCOUNT: { PASSWORD },
} = INSURANCE_FIELD_IDS;

const {
  ACCOUNT: {
    PASSWORD_RESET: {
      [PASSWORD]: { CANNOT_USE_PREVIOUS_PASSWORD: ERROR_MESSAGE },
    },
  },
} = ERROR_MESSAGES.INSURANCE;

/**
 * cannotUseNewPasswordValidation
 * Generate an error count, error list and summary for GOV design errors.
 * @returns {ValidationErrors} Error count, error list and summary
 */
const cannotUseNewPasswordValidation = (): ValidationErrors => generateValidationErrors(PASSWORD, ERROR_MESSAGE);

export default cannotUseNewPasswordValidation;
