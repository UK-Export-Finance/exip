import emailValidation from '.';
import { MAXIMUM_CHARACTERS } from '../../constants';
import generateValidationErrors from '../../helpers/validation';
import maxLengthValidation from '../max-length';
import { mockErrorMessagesObject, mockErrors, mockValidEmail } from '../../test-mocks';

describe('shared-validation/email', () => {
  const mockFieldId = 'email';

  describe('when the email is empty', () => {
    it('should return a validation error', () => {
      const mockValue = '';

      const result = emailValidation(mockFieldId, mockValue, mockErrorMessagesObject, mockErrors);

      const expected = generateValidationErrors(mockFieldId, mockErrorMessagesObject.IS_EMPTY, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when the email is invalid', () => {
    it('should return a validation error', () => {
      const mockInvalidEmail = 'mockemail.com';

      const result = emailValidation(mockFieldId, mockInvalidEmail, mockErrorMessagesObject, mockErrors);

      const expected = generateValidationErrors(mockFieldId, mockErrorMessagesObject.INCORRECT_FORMAT, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe(`when email is over ${MAXIMUM_CHARACTERS.EMAIL} characters`, () => {
    it('should return the results of maxLengthValidation', () => {
      const suffix = '@email.com';

      const extraCharactersLength = MAXIMUM_CHARACTERS.EMAIL - suffix.length + 1;

      const mockValue = `${'a'.repeat(extraCharactersLength)}${suffix}`;

      const result = emailValidation(mockFieldId, mockValue, mockErrorMessagesObject, mockErrors);

      const expected = maxLengthValidation(mockValue, mockFieldId, mockErrorMessagesObject.ABOVE_MAXIMUM, mockErrors, MAXIMUM_CHARACTERS.EMAIL);

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no validation errors', () => {
    it('should return the provided errors object', () => {
      const result = emailValidation(mockFieldId, mockValidEmail, mockErrorMessagesObject, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});
