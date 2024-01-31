import emailRules from './email';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/account';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import emailValidation from '../../../../../../../shared-validation/email';
import { mockErrors } from '../../../../../../../test-mocks';

const { EMAIL: FIELD_ID } = FIELD_IDS;

const {
  ACCOUNT: {
    CREATE: {
      YOUR_DETAILS: { [FIELD_ID]: ERROR_MESSAGE },
    },
  },
} = ERROR_MESSAGES.INSURANCE;

describe('controllers/insurance/account/create/your-details/validation/rules/email', () => {
  it('should return the result of emailValidation', () => {
    const mockFormBody = {};
    const result = emailRules(mockFormBody, mockErrors);

    const expected = emailValidation(FIELD_ID, mockFormBody[FIELD_ID], ERROR_MESSAGE.INCORRECT_FORMAT, mockErrors);

    expect(result).toEqual(expected);
  });
});
