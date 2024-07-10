import passwordRules from './password';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/account';
import emailAndPasswordValidation from '../../../../../../shared-validation/email-and-password-incorrect';
import { mockAccount, mockErrors } from '../../../../../../test-mocks';

const { PASSWORD: FIELD_ID } = FIELD_IDS;

describe('controllers/insurance/account/sign-in/validation/rules/password', () => {
  describe('when a password is not provided', () => {
    it('should return the result of passwordValidation', () => {
      const mockFormBody = {};
      const result = passwordRules(mockFormBody, mockErrors);

      const expected = emailAndPasswordValidation(mockFormBody);

      expect(result).toEqual(expected);
    });
  });

  describe('when a password is provided', () => {
    it('should return the provided errors', () => {
      const mockFormBody = { [FIELD_ID]: mockAccount[FIELD_ID] };

      const result = passwordRules(mockFormBody, mockErrors);

      const expected = mockErrors;

      expect(result).toEqual(expected);
    });
  });
});
