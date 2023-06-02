import accountDoesNotExistValidation from '.';
import INSURANCE_FIELD_IDS from '../../../../../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import generateValidationErrors from '../../../../../../helpers/validation';

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

describe('controllers/insurance/account/password-reset/validation/account-does-not-exist', () => {
  it('should return the result of generateValidationErrors', () => {
    const result = accountDoesNotExistValidation();

    const expected = generateValidationErrors(EMAIL, ERROR_MESSAGE);

    expect(result).toEqual(expected);
  });
});
