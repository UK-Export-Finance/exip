import emailValidation from '.';
import { MAXIMUM_CHARACTERS } from '../../constants';
import generateValidationErrors from '../../helpers/validation';
import maxLengthValidation from '../max-length';
import { mockErrorMessagesObject, mockErrors } from '../../test-mocks';

const validEmail = 'mock@email.com';

describe('shared-validation/email', () => {
  const mockFieldId = 'email';

  describe('when the email is empty', () => {
    it('should return validation error', () => {
      const mockValue = '';

      const result = emailValidation(mockFieldId, mockValue, mockErrorMessagesObject, mockErrors);

      const expected = generateValidationErrors(mockFieldId, mockErrorMessagesObject.IS_EMPTY, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when email does not contain an @ symbol', () => {
    it('should return validation error', () => {
      const mockValue = 'mockemail.com';

      const result = emailValidation(mockFieldId, mockValue, mockErrorMessagesObject, mockErrors);

      const expected = generateValidationErrors(mockFieldId, mockErrorMessagesObject.INCORRECT_FORMAT, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when email does not contain at least one dot', () => {
    it('should return validation error', () => {
      const mockValue = 'mock@emailcom';

      const result = emailValidation(mockFieldId, mockValue, mockErrorMessagesObject, mockErrors);

      const expected = generateValidationErrors(mockFieldId, mockErrorMessagesObject.INCORRECT_FORMAT, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when email contains a space', () => {
    it('should return validation error', () => {
      const mockValue = 'mock @email.com';

      const result = emailValidation(mockFieldId, mockValue, mockErrorMessagesObject, mockErrors);

      const expected = generateValidationErrors(mockFieldId, mockErrorMessagesObject.INCORRECT_FORMAT, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when email does not contain a domain', () => {
    it('should return validation error', () => {
      const mockValue = 'mock@email';

      const result = emailValidation(mockFieldId, mockValue, mockErrorMessagesObject, mockErrors);

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
      const result = emailValidation(mockFieldId, validEmail, mockErrorMessagesObject, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});
