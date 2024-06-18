import numberValidation from '.';
import generateValidationErrors from '../validation';
import { RequestBody } from '../../../types';
import { mockErrors } from '../../test-mocks';

describe('server/helpers/number-validation', () => {
  const mockBody = {
    testField: '',
  } as RequestBody;

  const FIELD = 'testField';

  const errorMessage = 'test error response';

  describe('number is a letter', () => {
    it('should return a validation error', () => {
      mockBody.testField = 'a';
      const response = numberValidation({ formBody: mockBody, errors: mockErrors, errorMessage, fieldId: FIELD });

      const expected = generateValidationErrors(FIELD, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe('number contains a letter', () => {
    it('should return a validation error', () => {
      mockBody.testField = '4S';
      const response = numberValidation({ formBody: mockBody, errors: mockErrors, errorMessage, fieldId: FIELD });

      const expected = generateValidationErrors(FIELD, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe('number is a special character', () => {
    it('should return a validation error', () => {
      mockBody.testField = '!';
      const response = numberValidation({ formBody: mockBody, errors: mockErrors, errorMessage, fieldId: FIELD });

      const expected = generateValidationErrors(FIELD, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe('number contains a special character', () => {
    it('should return a validation error', () => {
      mockBody.testField = '3!';
      const response = numberValidation({ formBody: mockBody, errors: mockErrors, errorMessage, fieldId: FIELD });

      const expected = generateValidationErrors(FIELD, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe('number is negative', () => {
    it('should return a validation error', () => {
      mockBody.testField = '-3';
      const response = numberValidation({ formBody: mockBody, errors: mockErrors, errorMessage, fieldId: FIELD });

      const expected = generateValidationErrors(FIELD, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe('number is negative but "allowNegativeValue" is set to "true"', () => {
    it('should not return a validation error', () => {
      mockBody.testField = '-3';
      const response = numberValidation({ formBody: mockBody, errors: mockErrors, errorMessage, fieldId: FIELD, allowNegativeValue: true });

      expect(response).toEqual(mockErrors);
    });
  });

  describe('number is valid', () => {
    it('should not return a validation error', () => {
      mockBody.testField = '3';
      const response = numberValidation({ formBody: mockBody, errors: mockErrors, errorMessage, fieldId: FIELD });

      expect(response).toEqual(mockErrors);
    });
  });

  describe('number has a comma', () => {
    it('should not return a validation error', () => {
      mockBody.testField = '3,000,000';
      const response = numberValidation({ formBody: mockBody, errors: mockErrors, errorMessage, fieldId: FIELD });

      expect(response).toEqual(mockErrors);
    });
  });

  describe('number has a decimal place', () => {
    it('should return a validation error if allowDecimalPlaces is set to false', () => {
      mockBody.testField = '200.50';
      const response = numberValidation({ formBody: mockBody, errors: mockErrors, errorMessage, fieldId: FIELD, allowDecimalPlaces: false });

      const expected = generateValidationErrors(FIELD, errorMessage, mockErrors);

      expect(response).toEqual(expected);
    });

    it('should NOT return a validation error if allowDecimalPlaces is set to true', () => {
      mockBody.testField = '200.50';
      const response = numberValidation({ formBody: mockBody, errors: mockErrors, errorMessage, fieldId: FIELD, allowDecimalPlaces: true });

      expect(response).toEqual(mockErrors);
    });
  });
});
