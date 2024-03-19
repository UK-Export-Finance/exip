import maxLengthValidation from '.';
import generateValidationErrors from '../../helpers/validation';
import { mockErrors } from '../../test-mocks';

describe('shared-validation/feedback', () => {
  let mockFormBody = {};

  const mockFieldId = 'Mock field';
  const mockErrorMessage = 'Enter mock field';
  const maximum = 10;

  describe('when the field over maximum number of characters', () => {
    it('should return a validation error', () => {
      mockFormBody = {
        [mockFieldId]: 'a'.repeat(maximum + 1),
      };

      const result = maxLengthValidation(mockFormBody[mockFieldId], mockFieldId, mockErrorMessage, mockErrors, maximum);

      const expected = generateValidationErrors(mockFieldId, mockErrorMessage, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no validation errors', () => {
    it('should return the provided errors object', () => {
      mockFormBody = {
        [mockFieldId]: 'a',
      };

      const result = maxLengthValidation(mockFormBody[mockFieldId], mockFieldId, mockErrorMessage, mockErrors, maximum);

      expect(result).toEqual(mockErrors);
    });
  });
});
