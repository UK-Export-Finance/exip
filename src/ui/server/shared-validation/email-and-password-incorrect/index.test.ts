import emailAndPasswordIncorrectValidationErrors from '.';
import generateValidationErrors from '../../helpers/validation';
import ACCOUNT_FIELD_IDS from '../../constants/field-ids/insurance/account';
import { ERROR_MESSAGES } from '../../content-strings';
import { mockErrors } from '../../test-mocks';

const { EMAIL, PASSWORD } = ACCOUNT_FIELD_IDS;

const {
  ACCOUNT: { SIGN_IN: ERROR_MESSAGES_OBJECT },
} = ERROR_MESSAGES.INSURANCE;

describe('shared-validation/email-and-password-incorrect', () => {
  describe('when the provided errors does NOT have a count of 1', () => {
    it('should return validation errors for both EMAIL and PASSWORD', () => {
      const result = emailAndPasswordIncorrectValidationErrors(mockErrors);

      const emailError = generateValidationErrors(EMAIL, ERROR_MESSAGES_OBJECT[EMAIL].INCORRECT, {});

      const expected = generateValidationErrors(PASSWORD, ERROR_MESSAGES_OBJECT[PASSWORD].INCORRECT, emailError);

      expect(result).toEqual(expected);
    });
  });

  describe('when the provided errors has a count of 1', () => {
    it('should return validation errors for both EMAIL and PASSWORD with the provided errors', () => {
      const mockErrorsWithCount = { count: 1 };

      const result = emailAndPasswordIncorrectValidationErrors(mockErrorsWithCount);

      const expected = generateValidationErrors(PASSWORD, ERROR_MESSAGES_OBJECT[PASSWORD].INCORRECT, mockErrorsWithCount);

      expect(result).toEqual(expected);
    });
  });
});
