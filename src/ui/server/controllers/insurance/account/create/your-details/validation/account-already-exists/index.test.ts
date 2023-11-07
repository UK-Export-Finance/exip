import accountAlreadyExistsValidation from '.';
import INSURANCE_FIELD_IDS from '../../../../../../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import generateValidationErrors from '../../../../../../../helpers/validation';

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

describe('controllers/insurance/account/create/your-details/validation/account-already-exists', () => {
  it('should return the result of generateValidationErrors', () => {
    const result = accountAlreadyExistsValidation();

    const expected = generateValidationErrors(EMAIL, ERROR_MESSAGE);

    expect(result).toEqual(expected);
  });
});
