import wholeNumberValidation from '.';
import generateValidationErrors from '../validation';
import { RequestBody } from '../../../types';
import { mockErrors } from '../../test-mocks';

describe('server/helpers/whole-number-validation', () => {
  const mockBody = {
    testField: '',
  } as RequestBody;

  const FIELD = 'testField';

  const errorMessage = 'test error response';

  describe('number is a letter', () => {
    it('should return a validation error', () => {
      mockBody.testField = 'a';
      const response = wholeNumberValidation(mockBody, mockErrors, errorMessage, FIELD);

      const expected = generateValidationErrors(FIELD, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe('number contains a letter', () => {
    it('should return a validation error', () => {
      mockBody.testField = '4S';
      const response = wholeNumberValidation(mockBody, mockErrors, errorMessage, FIELD);

      const expected = generateValidationErrors(FIELD, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe('number is a special character', () => {
    it('should return a validation error', () => {
      mockBody.testField = '!';
      const response = wholeNumberValidation(mockBody, mockErrors, errorMessage, FIELD);

      const expected = generateValidationErrors(FIELD, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe('number contains a special character', () => {
    it('should return a validation error', () => {
      mockBody.testField = '3!';
      const response = wholeNumberValidation(mockBody, mockErrors, errorMessage, FIELD);

      const expected = generateValidationErrors(FIELD, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe('number is negative', () => {
    it('should return a validation error', () => {
      mockBody.testField = '-3';
      const response = wholeNumberValidation(mockBody, mockErrors, errorMessage, FIELD);

      const expected = generateValidationErrors(FIELD, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe('number is negative but "allowNegativeValue" is set to "true"', () => {
    it('should not return a validation error', () => {
      mockBody.testField = '-3';
      const response = wholeNumberValidation(mockBody, mockErrors, errorMessage, FIELD, true);

      expect(response).toEqual(mockErrors);
    });
  });

  describe('number is valid', () => {
    it('should not return a validation error', () => {
      mockBody.testField = '3';
      const response = wholeNumberValidation(mockBody, mockErrors, errorMessage, FIELD);

      expect(response).toEqual(mockErrors);
    });
  });

  describe('number has a comma', () => {
    it('should not return a validation error', () => {
      mockBody.testField = '3,000,000';
      const response = wholeNumberValidation(mockBody, mockErrors, errorMessage, FIELD);

      expect(response).toEqual(mockErrors);
    });
  });
});
