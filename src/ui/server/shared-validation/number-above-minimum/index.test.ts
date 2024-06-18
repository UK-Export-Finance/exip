import numberAboveMinimumValidation from '.';
import { mockErrorMessagesObject, mockErrors } from '../../test-mocks';
import { RequestBody } from '../../../types';
import generateValidationErrors from '../../helpers/validation';
import numberValidation from '../../helpers/number-validation';

describe('shared-validation/whole-number-above-minimum', () => {
  const FIELD_ID = 'FIELD_ID';
  const MINIMUM = 1;

  const mockBody = {
    [FIELD_ID]: '0',
  } as RequestBody;

  describe('when a number is not provided', () => {
    it('should return a validation errors', () => {
      const mockEmptyBody = {};

      const result = numberAboveMinimumValidation({
        formBody: mockEmptyBody,
        fieldId: FIELD_ID,
        errorMessage: mockErrorMessagesObject,
        errors: mockErrors,
        minimum: MINIMUM,
      });

      const expected = generateValidationErrors(FIELD_ID, mockErrorMessagesObject.IS_EMPTY, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when the provided number is below minimum', () => {
    it('should return a validation errors', () => {
      const result = numberAboveMinimumValidation({
        formBody: mockBody,
        fieldId: FIELD_ID,
        errorMessage: mockErrorMessagesObject,
        errors: mockErrors,
        minimum: MINIMUM,
      });

      const expected = generateValidationErrors(FIELD_ID, mockErrorMessagesObject.BELOW_MINIMUM, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when the provided number is not a whole number', () => {
    it('should return the result of "numberValidation"', () => {
      mockBody[FIELD_ID] = '1!';

      const result = numberAboveMinimumValidation({
        formBody: mockBody,
        fieldId: FIELD_ID,
        errorMessage: mockErrorMessagesObject,
        errors: mockErrors,
        minimum: MINIMUM,
      });

      const expected = generateValidationErrors(FIELD_ID, mockErrorMessagesObject.INCORRECT_FORMAT, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when the provided number is at minimum', () => {
    it('should return provided errors object', () => {
      mockBody[FIELD_ID] = '1';

      const result = numberValidation({
        formBody: mockBody,
        errors: mockErrors,
        errorMessage: mockErrorMessagesObject.INCORRECT_FORMAT,
        fieldId: FIELD_ID,
      });

      expect(result).toEqual(mockErrors);
    });
  });

  describe('when the provided number above minimum', () => {
    it('should return provided errors object', () => {
      mockBody[FIELD_ID] = '200';

      const result = numberAboveMinimumValidation({
        formBody: mockBody,
        fieldId: FIELD_ID,
        errorMessage: mockErrorMessagesObject,
        errors: mockErrors,
        minimum: MINIMUM,
      });

      expect(result).toEqual(mockErrors);
    });
  });
});
