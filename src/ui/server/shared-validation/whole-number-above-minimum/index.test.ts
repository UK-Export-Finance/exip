import wholeNumberAboveMinimumValidation from '.';
import { mockErrorMessagesObject, mockErrors } from '../../test-mocks';
import { RequestBody } from '../../../types';
import generateValidationErrors from '../../helpers/validation';
import wholeNumberValidation from '../../helpers/whole-number-validation';

describe('shared-validation/whole-number-above-minimum', () => {
  const FIELD_ID = 'FIELD_ID';
  const MINIMUM = 1;

  const mockBody = {
    [FIELD_ID]: '0',
  } as RequestBody;

  describe('when a number is not provided', () => {
    it('should return validation errors', () => {
      const mockEmptyBody = {};

      const result = wholeNumberAboveMinimumValidation(mockEmptyBody, FIELD_ID, mockErrorMessagesObject, mockErrors, MINIMUM);

      const expected = generateValidationErrors(FIELD_ID, mockErrorMessagesObject.IS_EMPTY, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when the provided number is below minimum', () => {
    it('should return validation errors', () => {
      const result = wholeNumberAboveMinimumValidation(mockBody, FIELD_ID, mockErrorMessagesObject, mockErrors, MINIMUM);

      const expected = generateValidationErrors(FIELD_ID, mockErrorMessagesObject.BELOW_MINIMUM, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when the provided number is not a whole number', () => {
    it('should return the result of "wholeNumberValidation"', () => {
      mockBody[FIELD_ID] = '1!';

      const result = wholeNumberAboveMinimumValidation(mockBody, FIELD_ID, mockErrorMessagesObject, mockErrors, MINIMUM);

      const expected = generateValidationErrors(FIELD_ID, mockErrorMessagesObject.INCORRECT_FORMAT, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when the provided number is at minimum', () => {
    it('should return provided errors object', () => {
      mockBody[FIELD_ID] = '1';

      const result = wholeNumberValidation(mockBody, mockErrors, mockErrorMessagesObject.INCORRECT_FORMAT, FIELD_ID);

      expect(result).toEqual(mockErrors);
    });
  });

  describe('when the provided number above minimum', () => {
    it('should return provided errors object', () => {
      mockBody[FIELD_ID] = '200';

      const result = wholeNumberAboveMinimumValidation(mockBody, FIELD_ID, mockErrorMessagesObject, mockErrors, MINIMUM);

      expect(result).toEqual(mockErrors);
    });
  });
});
