import emailRules from './email';
import { MAXIMUM_CHARACTERS } from '../../../../../../constants';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/account';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import emailAndPasswordValidation from '../../../../../../shared-validation/email-and-password-incorrect';
import maxLengthValidation from '../../../../../../shared-validation/max-length';
import { mockErrors, mockValidEmail } from '../../../../../../test-mocks';

const { EMAIL: FIELD_ID } = FIELD_IDS;

const {
  ACCOUNT: {
    SIGN_IN: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
  },
} = ERROR_MESSAGES.INSURANCE;

describe('controllers/insurance/account/sign-in/validation/rules/email', () => {
  describe('when an email is not provided', () => {
    it('should return the result of emailAndPasswordValidation', () => {
      const mockFormBody = {};
      const result = emailRules(mockFormBody, mockErrors);

      const expected = emailAndPasswordValidation(mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when the email is invalid', () => {
    it('should return the result of emailAndPasswordValidation', () => {
      const mockFormBody = {
        [FIELD_ID]: 'mockemail.com',
      };

      const result = emailRules(mockFormBody, mockErrors);

      const expected = emailAndPasswordValidation(mockErrors);

      expect(result).toEqual(expected);
    });
  });

  it('should otherwise return the result of maxLengthValidation', () => {
    const mockFormBody = {
      [FIELD_ID]: mockValidEmail,
    };

    const result = emailRules(mockFormBody, mockErrors);

    const expected = maxLengthValidation(mockFormBody[FIELD_ID], FIELD_ID, ERROR_MESSAGES_OBJECT.ABOVE_MAXIMUM, mockErrors, MAXIMUM_CHARACTERS.EMAIL);

    expect(result).toEqual(expected);
  });
});
