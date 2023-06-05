import emailValidation from '.';
import generateValidationErrors from '../../helpers/validation';

describe('shared-validation/email', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  const mockFieldId = 'email';
  const mockErrorMessage = 'Incorrect format';

  describe('when the email is empty', () => {
    it('should return validation error', () => {
      const mockValue = '';

      const result = emailValidation(mockFieldId, mockValue, mockErrorMessage, mockErrors);

      const expected = generateValidationErrors(mockFieldId, mockErrorMessage, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when email does not contain an @ symbol', () => {
    it('should return validation error', () => {
      const mockValue = 'mockemail.com';

      const result = emailValidation(mockFieldId, mockValue, mockErrorMessage, mockErrors);

      const expected = generateValidationErrors(mockFieldId, mockErrorMessage, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when email does not contain at least one dot', () => {
    it('should return validation error', () => {
      const mockValue = 'mock@emailcom';

      const result = emailValidation(mockFieldId, mockValue, mockErrorMessage, mockErrors);

      const expected = generateValidationErrors(mockFieldId, mockErrorMessage, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when email contains a space', () => {
    it('should return validation error', () => {
      const mockValue = 'mock @email.com';

      const result = emailValidation(mockFieldId, mockValue, mockErrorMessage, mockErrors);

      const expected = generateValidationErrors(mockFieldId, mockErrorMessage, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when email does not contain a domain', () => {
    it('should return validation error', () => {
      const mockValue = 'mock@email';

      const result = emailValidation(mockFieldId, mockValue, mockErrorMessage, mockErrors);

      const expected = generateValidationErrors(mockFieldId, mockErrorMessage, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no validation errors', () => {
    it('should return the provided errors object', () => {
      const mockValue = 'mock@email.com';

      const result = emailValidation(mockFieldId, mockValue, mockErrorMessage, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});
