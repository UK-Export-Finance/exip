import passwordValidation from '.';
import generateValidationErrors from '../../helpers/validation';
import { ValidationErrors } from '../../../types';
import { mockErrors } from '../../test-mocks';

describe('shared-validation/password', () => {
  const mockFieldId = 'password';
  const mockErrorMessage = 'Incorrect format';

  const assertResult = (result: ValidationErrors) => {
    const expected = generateValidationErrors(mockFieldId, mockErrorMessage, mockErrors);

    expect(result).toEqual(expected);
  };

  describe('when the email is empty', () => {
    it('should return a validation error', () => {
      const mockValue = '';

      const result = passwordValidation(mockFieldId, mockValue, mockErrorMessage, mockErrors);

      assertResult(result);
    });
  });

  describe('when password does not have the minimum amount of characters', () => {
    it('should return a validation error', () => {
      const mockValue = 'Mock1!';

      const result = passwordValidation(mockFieldId, mockValue, mockErrorMessage, mockErrors);

      assertResult(result);
    });
  });

  describe('when password does not contain an uppercase letter', () => {
    it('should return a validation error', () => {
      const mockValue = 'mockpassword1!';

      const result = passwordValidation(mockFieldId, mockValue, mockErrorMessage, mockErrors);

      assertResult(result);
    });
  });

  describe('when password does not contain a lowercase letter', () => {
    it('should return a validation error', () => {
      const mockValue = 'MOCKPASSWORD1!';

      const result = passwordValidation(mockFieldId, mockValue, mockErrorMessage, mockErrors);

      assertResult(result);
    });
  });

  describe('when password does not contain a number', () => {
    it('should return a validation error', () => {
      const mockValue = 'Mockpassword!';

      const result = passwordValidation(mockFieldId, mockValue, mockErrorMessage, mockErrors);

      assertResult(result);
    });
  });

  describe('when password does not contain a special character', () => {
    it('should return a validation error', () => {
      const mockValue = 'Mockpassword1';

      const result = passwordValidation(mockFieldId, mockValue, mockErrorMessage, mockErrors);

      assertResult(result);
    });
  });

  describe('when there are no validation errors', () => {
    it('should return the provided errors object', () => {
      const mockValue = 'Mockpassword1!';

      const result = passwordValidation(mockFieldId, mockValue, mockErrorMessage, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});
