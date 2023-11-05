import emailRules from './email';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/account';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import emailAndPasswordValidation from '../../../../../../shared-validation/email-and-password';

const { EMAIL: FIELD_ID } = FIELD_IDS;

const {
  ACCOUNT: {
    SIGN_IN: { [FIELD_ID]: ERROR_MESSAGE },
  },
} = ERROR_MESSAGES.INSURANCE;

describe('controllers/insurance/account/sign-in/validation/rules/email', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  it('should return the result of emailAndPasswordValidation', () => {
    const mockFormBody = {};
    const result = emailRules(mockFormBody, mockErrors);

    const expected = emailAndPasswordValidation(mockFormBody, FIELD_ID, ERROR_MESSAGE.INCORRECT, mockErrors);

    expect(result).toEqual(expected);
  });
});
