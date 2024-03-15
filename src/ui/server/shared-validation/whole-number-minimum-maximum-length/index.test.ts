import wholeNumberMinimumMaximumLength from '.';
import { mockErrorMessagesObject, mockErrors } from '../../test-mocks';
import { RequestBody } from '../../../types';
import generateValidationErrors from '../../helpers/validation';
import wholeNumberValidation from '../../helpers/whole-number-validation';

describe('shared-validation/whole-number-minimum-maximum-length', () => {
  const FIELD_ID = 'FIELD_ID';
  const MINIMUM = 5;
  const MAXIMUM = 7;

  const mockBody = {
    [FIELD_ID]: '1234567',
  } as RequestBody;

  describe('when a number is not provided', () => {
    it('should return validation errors', () => {
      const mockEmptyBody = {};

      const result = wholeNumberMinimumMaximumLength(mockEmptyBody, FIELD_ID, mockErrorMessagesObject, mockErrors, MINIMUM, MAXIMUM);

      const expected = generateValidationErrors(FIELD_ID, mockErrorMessagesObject.IS_EMPTY, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when the provided number is below minimum length', () => {
    it('should return validation errors', () => {
      mockBody[FIELD_ID] = '1';

      const result = wholeNumberMinimumMaximumLength(mockBody, FIELD_ID, mockErrorMessagesObject, mockErrors, MINIMUM, MAXIMUM);

      const expected = generateValidationErrors(FIELD_ID, mockErrorMessagesObject.BELOW_MINIMUM, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when the provided number is above maximum length', () => {
    it('should return validation errors', () => {
      mockBody[FIELD_ID] = '123456789';

      const result = wholeNumberMinimumMaximumLength(mockBody, FIELD_ID, mockErrorMessagesObject, mockErrors, MINIMUM, MAXIMUM);

      const expected = generateValidationErrors(FIELD_ID, mockErrorMessagesObject.ABOVE_MAXIMUM, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when the provided number is not a whole number', () => {
    it('should return the result of "wholeNumberValidation"', () => {
      mockBody[FIELD_ID] = '12345!';

      const result = wholeNumberMinimumMaximumLength(mockBody, FIELD_ID, mockErrorMessagesObject, mockErrors, MINIMUM, MAXIMUM);

      const expected = wholeNumberValidation(mockBody, mockErrors, mockErrorMessagesObject.INCORRECT_FORMAT, FIELD_ID);

      expect(result).toEqual(expected);
    });
  });

  describe('when the provided number is at minimum', () => {
    it('should return provided errors object', () => {
      mockBody[FIELD_ID] = '12345';

      const result = wholeNumberMinimumMaximumLength(mockBody, FIELD_ID, mockErrorMessagesObject, mockErrors, MINIMUM, MAXIMUM);

      expect(result).toEqual(mockErrors);
    });
  });

  describe('when the provided number is at maximum', () => {
    it('should return provided errors object', () => {
      mockBody[FIELD_ID] = '1234567';

      const result = wholeNumberMinimumMaximumLength(mockBody, FIELD_ID, mockErrorMessagesObject, mockErrors, MINIMUM, MAXIMUM);

      expect(result).toEqual(mockErrors);
    });
  });
});
