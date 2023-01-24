import wholeNumberValidation from '.';
import { RequestBody } from '../../../types';
import generateValidationErrors from '../validation';

describe('server/helpers/whole-number-validation', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  const mockBody = {
    testField: '',
  } as RequestBody;

  const mockErrorField = {
    testField: {
      INCORRECT_FORMAT: 'test error response',
    },
  };

  const FIELD = 'testField';

  const errorMessage = mockErrorField[FIELD].INCORRECT_FORMAT;

  describe('number is a letter', () => {
    it('should return a validation error', () => {
      mockBody.testField = 'a';
      const response = wholeNumberValidation(mockBody, mockErrors, mockErrorField, FIELD);

      const expected = generateValidationErrors(FIELD, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe('number contains a letter', () => {
    it('should return a validation error', () => {
      mockBody.testField = '4S';
      const response = wholeNumberValidation(mockBody, mockErrors, mockErrorField, FIELD);

      const expected = generateValidationErrors(FIELD, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe('number is a special character', () => {
    it('should return a validation error', () => {
      mockBody.testField = '!';
      const response = wholeNumberValidation(mockBody, mockErrors, mockErrorField, FIELD);

      const expected = generateValidationErrors(FIELD, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe('number contains a special character', () => {
    it('should return a validation error', () => {
      mockBody.testField = '3!';
      const response = wholeNumberValidation(mockBody, mockErrors, mockErrorField, FIELD);

      const expected = generateValidationErrors(FIELD, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe('number is negative', () => {
    it('should return a validation error', () => {
      mockBody.testField = '-3';
      const response = wholeNumberValidation(mockBody, mockErrors, mockErrorField, FIELD);

      const expected = generateValidationErrors(FIELD, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe('number is valid', () => {
    it('should not return a validation error', () => {
      mockBody.testField = '3';
      const response = wholeNumberValidation(mockBody, mockErrors, mockErrorField, FIELD);

      expect(response).toEqual(mockErrors);
    });
  });
});
