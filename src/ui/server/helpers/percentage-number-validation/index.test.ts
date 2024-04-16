import percentageNumberValidation from '.';
import generateValidationErrors from '../validation';
import { ErrorMessageObject } from '../../../types';
import { mockErrors } from '../../test-mocks';

describe('server/helpers/percentage-number-validation', () => {
  const mockBody = {};

  const FIELD_ID = 'testField';

  const errorMessages = {
    IS_EMPTY: 'Is empty',
    INCORRECT_FORMAT: 'Incorrect format',
    BELOW_MINIMUM: 'Below minimum',
    ABOVE_MAXIMUM: 'Above maximum',
  } as ErrorMessageObject;

  describe('percentage is an empty string', () => {
    it('should return a validation error', () => {
      mockBody[FIELD_ID] = '';
      const response = percentageNumberValidation(mockBody, FIELD_ID, mockErrors, errorMessages);

      const expected = generateValidationErrors(FIELD_ID, errorMessages.IS_EMPTY, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe('percentage is null', () => {
    it('should return a validation error', () => {
      mockBody[FIELD_ID] = null;
      const response = percentageNumberValidation(mockBody, FIELD_ID, mockErrors, errorMessages);

      const expected = generateValidationErrors(FIELD_ID, errorMessages.IS_EMPTY, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe('percentage is a letter', () => {
    it('should return a validation error', () => {
      mockBody[FIELD_ID] = 'a';
      const response = percentageNumberValidation(mockBody, FIELD_ID, mockErrors, errorMessages);

      const expected = generateValidationErrors(FIELD_ID, errorMessages.INCORRECT_FORMAT, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe('percentage contains a letter', () => {
    it('should return a validation error', () => {
      mockBody[FIELD_ID] = '4a';
      const response = percentageNumberValidation(mockBody, FIELD_ID, mockErrors, errorMessages);

      const expected = generateValidationErrors(FIELD_ID, errorMessages.INCORRECT_FORMAT, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe('percentage is a special character', () => {
    it('should return a validation error', () => {
      mockBody[FIELD_ID] = '!';
      const response = percentageNumberValidation(mockBody, FIELD_ID, mockErrors, errorMessages);

      const expected = generateValidationErrors(FIELD_ID, errorMessages.INCORRECT_FORMAT, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe('percentage contains a special character', () => {
    it('should return a validation error', () => {
      mockBody[FIELD_ID] = '3!';
      const response = percentageNumberValidation(mockBody, FIELD_ID, mockErrors, errorMessages);

      const expected = generateValidationErrors(FIELD_ID, errorMessages.INCORRECT_FORMAT, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe('percentage contains a comma', () => {
    it('should return a validation error', () => {
      mockBody[FIELD_ID] = '3,5';
      const response = percentageNumberValidation(mockBody, FIELD_ID, mockErrors, errorMessages);

      const expected = generateValidationErrors(FIELD_ID, errorMessages.INCORRECT_FORMAT, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe('percentage is negative', () => {
    it('should return a validation error', () => {
      mockBody[FIELD_ID] = '-1';
      const response = percentageNumberValidation(mockBody, FIELD_ID, mockErrors, errorMessages);

      const expected = generateValidationErrors(FIELD_ID, errorMessages.BELOW_MINIMUM, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe('percentage is negative and contains a special character', () => {
    it('should return a validation error', () => {
      mockBody[FIELD_ID] = '-1!';
      const response = percentageNumberValidation(mockBody, FIELD_ID, mockErrors, errorMessages);

      const expected = generateValidationErrors(FIELD_ID, errorMessages.INCORRECT_FORMAT, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe('percentage is above 100', () => {
    it('should return a validation error', () => {
      mockBody[FIELD_ID] = '101';
      const response = percentageNumberValidation(mockBody, FIELD_ID, mockErrors, errorMessages);

      const expected = generateValidationErrors(FIELD_ID, errorMessages.ABOVE_MAXIMUM, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe('number is valid', () => {
    it('should not return a validation error', () => {
      mockBody[FIELD_ID] = '3';
      const response = percentageNumberValidation(mockBody, FIELD_ID, mockErrors, errorMessages);

      expect(response).toEqual(mockErrors);
    });
  });
});
