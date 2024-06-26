import validateFeedbackInput from '.';
import generateValidationErrors from '../../helpers/validation';

describe('shared-validation/feedback', () => {
  let mockFormBody = {};

  const mockErrors = {
    summary: [],
    errorList: {},
  };

  const mockFieldId = 'Mock field';
  const mockErrorMessage = 'Enter mock field';
  const maximum = 10;

  describe('when the field over maximum number of characters', () => {
    it('should return validation error', () => {
      mockFormBody = {
        [mockFieldId]: 'a'.repeat(maximum + 1),
      };

      const result = validateFeedbackInput(mockFormBody[mockFieldId], mockFieldId, mockErrorMessage, mockErrors, maximum);

      const expected = generateValidationErrors(mockFieldId, mockErrorMessage, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no validation errors', () => {
    it('should return the provided errors object', () => {
      mockFormBody = {
        [mockFieldId]: 'a',
      };

      const result = validateFeedbackInput(mockFormBody[mockFieldId], mockFieldId, mockErrorMessage, mockErrors, maximum);

      expect(result).toEqual(mockErrors);
    });
  });
});
