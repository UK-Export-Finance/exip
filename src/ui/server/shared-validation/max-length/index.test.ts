import maxLengthValidation from '.';
import generateValidationErrors from '../../helpers/validation';
import { mockErrors, mockErrorMessagesObject } from '../../test-mocks';

describe('shared-validation/max-length', () => {
  const mockFieldId = 'Mock field';
  const mockErrorMessage = mockErrorMessagesObject.ABOVE_MAXIMUM;
  const maximum = 10;

  describe('when the field is over the maximum number of characters', () => {
    it('should return a validation error', () => {
      const mockFormBody = {
        [mockFieldId]: 'a'.repeat(maximum + 1),
      };

      const result = maxLengthValidation(mockFormBody[mockFieldId], mockFieldId, mockErrorMessage, mockErrors, maximum);

      const expected = generateValidationErrors(mockFieldId, mockErrorMessage, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no validation errors', () => {
    it('should return the provided errors object', () => {
      const mockFormBody = {
        [mockFieldId]: 'a',
      };

      const result = maxLengthValidation(mockFormBody[mockFieldId], mockFieldId, mockErrorMessage, mockErrors, maximum);

      expect(result).toEqual(mockErrors);
    });
  });
});
