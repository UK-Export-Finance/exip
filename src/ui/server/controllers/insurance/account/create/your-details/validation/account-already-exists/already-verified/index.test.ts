import accountAlreadyExistsAlreadyVerifiedValidation from '.';
import FIELD_IDS from '../../../../../../../../constants/field-ids/insurance/account';
import { ERROR_MESSAGES } from '../../../../../../../../content-strings';
import generateValidationErrors from '../../../../../../../../helpers/validation';

const { EMAIL } = FIELD_IDS;

const {
  ACCOUNT: {
    CREATE: { YOUR_DETAILS: ERROR_MESSAGES_OBJECT },
  },
} = ERROR_MESSAGES.INSURANCE;

describe('controllers/insurance/account/create/your-details/validation/account-already-exists/already-verified', () => {
  it('should return the result of generateValidationErrors', () => {
    const result = accountAlreadyExistsAlreadyVerifiedValidation();

    const expected = generateValidationErrors(EMAIL, ERROR_MESSAGES_OBJECT.ACCOUNT_ALREADY_EXISTS, {});

    expect(result).toEqual(expected);
  });
});
