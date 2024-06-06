import accountAlreadyExistsInvalidPasswordValidation from '.';
import INSURANCE_FIELD_IDS from '../../../../../../../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../../../../../../../content-strings';
import generateValidationErrors from '../../../../../../../../helpers/validation';

const {
  ACCOUNT: { EMAIL, PASSWORD },
} = INSURANCE_FIELD_IDS;

const {
  ACCOUNT: {
    CREATE: { YOUR_DETAILS: ERROR_MESSAGES_OBJECT },
  },
} = ERROR_MESSAGES.INSURANCE;

describe('controllers/insurance/account/create/your-details/validation/account-already-exists/invalid-password', () => {
  it('should return the result of generateValidationErrors', () => {
    const result = accountAlreadyExistsInvalidPasswordValidation();

    const emailError = generateValidationErrors(EMAIL, ERROR_MESSAGES_OBJECT[EMAIL].ACCOUNT_ALREADY_EXISTS_INCORRECT, {});

    const expected = generateValidationErrors(PASSWORD, ERROR_MESSAGES_OBJECT[PASSWORD].ACCOUNT_ALREADY_EXISTS_INCORRECT, emailError);

    expect(result).toEqual(expected);
  });
});
