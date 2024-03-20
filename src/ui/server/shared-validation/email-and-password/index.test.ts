import emailAndPasswordValidation from '.';
import generateValidationErrors from '../../helpers/validation';
import INSURANCE_FIELD_IDS from '../../constants/field-ids/insurance';
import { mockAccount, mockErrors } from '../../test-mocks';

const {
  ACCOUNT: { EMAIL, PASSWORD },
} = INSURANCE_FIELD_IDS;

describe('shared-validation/email-and-password', () => {
  let mockFormBody = {};

  const mockErrorMessage = 'Mock error';

  describe(`when ${EMAIL} is not provided`, () => {
    it('should return a validation error', () => {
      mockFormBody = {
        [EMAIL]: '',
        [PASSWORD]: mockAccount.password,
      };

      const result = emailAndPasswordValidation(mockFormBody, EMAIL, mockErrorMessage, mockErrors);

      const expected = generateValidationErrors(EMAIL, mockErrorMessage, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${PASSWORD} is not provided`, () => {
    it('should return a validation error', () => {
      mockFormBody = {
        [EMAIL]: mockAccount.email,
        [PASSWORD]: '',
      };

      const result = emailAndPasswordValidation(mockFormBody, PASSWORD, mockErrorMessage, mockErrors);

      const expected = generateValidationErrors(PASSWORD, mockErrorMessage, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no validation errors', () => {
    it('should return the provided errors object', () => {
      mockFormBody = {
        [EMAIL]: mockAccount.email,
        [PASSWORD]: mockAccount.password,
      };

      const result = emailAndPasswordValidation(mockFormBody, EMAIL, mockErrorMessage, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});
