import maxLengthValidation from '.';
import generateValidationErrors from '../../helpers/validation';
import { mockErrors, mockErrorMessagesObject } from '../../test-mocks';

describe('shared-validation/min-length', () => {
  const mockFieldId = 'Mock field';
  const mockErrorMessage = mockErrorMessagesObject.BELOW_MINIMUM;
  const minimum = 10;

  describe('when the field is below the minimum number of characters', () => {
    it('should return a validation error', () => {
      const mockFormBody = {
        [mockFieldId]: 'a'.repeat(minimum - 1),
      };

      const result = maxLengthValidation(mockFormBody[mockFieldId], mockFieldId, mockErrorMessage, mockErrors, minimum);

      const expected = generateValidationErrors(mockFieldId, mockErrorMessage, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no validation errors', () => {
    it('should return the provided errors object', () => {
      const mockFormBody = {
        [mockFieldId]: 'a'.repeat(minimum),
      };

      const result = maxLengthValidation(mockFormBody[mockFieldId], mockFieldId, mockErrorMessage, mockErrors, minimum);

      expect(result).toEqual(mockErrors);
    });
  });
});
