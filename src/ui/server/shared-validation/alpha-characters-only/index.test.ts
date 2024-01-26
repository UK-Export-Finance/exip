import alphaCharactersOnlyValidation from '.';
import generateValidationErrors from '../../helpers/validation';

const mockFieldId = 'mockId';
const mockErrorMessage = 'Mock error';
const mockErrors = {};
const mockSpecialCharacters = '!@£$%^&*()?';

describe('shared-validation/alpha-characters-only', () => {
  describe('when a string contains numbers', () => {
    it('should return generateValidationErrors', () => {
      const mockFieldValue = 'mock 123';

      const result = alphaCharactersOnlyValidation(mockFieldValue, mockFieldId, mockErrorMessage, mockErrors);

      const expected = generateValidationErrors(mockFieldId, mockErrorMessage, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when a string contains special characters', () => {
    it('should return generateValidationErrors', () => {
      const mockFieldValue = `mock ${mockSpecialCharacters}`;

      const result = alphaCharactersOnlyValidation(mockFieldValue, mockFieldId, mockErrorMessage, mockErrors);

      const expected = generateValidationErrors(mockFieldId, mockErrorMessage, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when a string contains numbers and special characters', () => {
    it('should return generateValidationErrors', () => {
      const mockFieldValue = `mock 123 ${mockSpecialCharacters}`;

      const result = alphaCharactersOnlyValidation(mockFieldValue, mockFieldId, mockErrorMessage, mockErrors);

      const expected = generateValidationErrors(mockFieldId, mockErrorMessage, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no validation errors', () => {
    it('should return false', () => {
      const mockValidFieldValue = 'Example valid string';

      const result = alphaCharactersOnlyValidation(mockValidFieldValue, mockFieldId, mockErrorMessage, mockErrors);

      expect(result).toEqual(false);
    });
  });
});
