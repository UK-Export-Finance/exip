import passwordRules from './password';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/account';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import emailAndPasswordValidation from '../../../../../../shared-validation/email-and-password';
import { mockErrors } from '../../../../../../test-mocks';

const { PASSWORD: FIELD_ID } = FIELD_IDS;

const {
  ACCOUNT: {
    SIGN_IN: { [FIELD_ID]: ERROR_MESSAGE },
  },
} = ERROR_MESSAGES.INSURANCE;

describe('controllers/insurance/account/sign-in/validation/rules/password', () => {
  it('should return the result of passwordValidation', () => {
    const mockFormBody = {};
    const result = passwordRules(mockFormBody, mockErrors);

    const expected = emailAndPasswordValidation(mockFormBody, FIELD_ID, ERROR_MESSAGE.INCORRECT, mockErrors);

    expect(result).toEqual(expected);
  });
});
