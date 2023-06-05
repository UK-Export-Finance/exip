import cannotUseNewPasswordValidation from '.';
import INSURANCE_FIELD_IDS from '../../../../../../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import generateValidationErrors from '../../../../../../../helpers/validation';

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

describe('controllers/insurance/account/create/new-password/validation/cannot-use-new-password', () => {
  it('should return the result of generateValidationErrors', () => {
    const result = cannotUseNewPasswordValidation();

    const expected = generateValidationErrors(PASSWORD, ERROR_MESSAGE);

    expect(result).toEqual(expected);
  });
});
