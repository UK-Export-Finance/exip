import emptyFieldValidation from '.';
import generateValidationErrors from '../../helpers/validation';

describe('shared-validation/empty-field', () => {
  let mockFormBody = {};

  const mockErrors = {
    summary: [],
    errorList: {},
  };

  const mockFieldId = 'Mock field';
  const mockErrorMessage = 'Enter mock field';

  describe('when the field is not provided', () => {
    it('should return validation error', () => {
      const result = emptyFieldValidation(mockFormBody, mockFieldId, mockErrorMessage, mockErrors);

      const expected = generateValidationErrors(mockFieldId, mockErrorMessage, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no validation errors', () => {
    it('should return the provided errors object', () => {
      mockFormBody = {
        [mockFieldId]: 'MNock value',
      };

      const result = emptyFieldValidation(mockFormBody, mockFieldId, mockErrorMessage, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});
