import regexValidation from '.';
import generateValidationErrors from '../../helpers/validation';
import { REGEX } from '../../constants';

const mockFieldId = 'mockId';
const mockErrorMessage = 'Mock error';
const mockErrors = {};
const mockSpecialCharacters = '!@£$%^&*()?';

describe('shared-validation/regex-validation', () => {
  describe('ALPHA_CHARACTERS_AND_SPACE', () => {
    describe('when a string contains numbers', () => {
      it('should return generateValidationErrors', () => {
        const mockFieldValue = 'mock 123';

        const result = regexValidation(mockFieldValue, mockFieldId, REGEX.ALPHA_CHARACTERS_AND_SPACE, mockErrorMessage, mockErrors);

        const expected = generateValidationErrors(mockFieldId, mockErrorMessage, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe('when a string contains special characters', () => {
      it('should return generateValidationErrors', () => {
        const mockFieldValue = `mock ${mockSpecialCharacters}`;

        const result = regexValidation(mockFieldValue, mockFieldId, REGEX.ALPHA_CHARACTERS_AND_SPACE, mockErrorMessage, mockErrors);

        const expected = generateValidationErrors(mockFieldId, mockErrorMessage, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe('when a string contains numbers and special characters', () => {
      it('should return generateValidationErrors', () => {
        const mockFieldValue = `mock 123 ${mockSpecialCharacters}`;

        const result = regexValidation(mockFieldValue, mockFieldId, REGEX.ALPHA_CHARACTERS_AND_SPACE, mockErrorMessage, mockErrors);

        const expected = generateValidationErrors(mockFieldId, mockErrorMessage, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe('when there are no validation errors', () => {
      it('should return false', () => {
        const mockValidFieldValue = 'Example valid string';

        const result = regexValidation(mockValidFieldValue, mockFieldId, REGEX.ALPHA_CHARACTERS_AND_SPACE, mockErrorMessage, mockErrors);

        expect(result).toEqual(false);
      });
    });
  });

  describe('ALPHA_CHARACTERS_AND_SPACE_HYPHEN_APOSTROPHE', () => {
    describe('when a string contains numbers', () => {
      it('should return generateValidationErrors', () => {
        const mockFieldValue = 'mock 123';

        const result = regexValidation(mockFieldValue, mockFieldId, REGEX.ALPHA_CHARACTERS_AND_SPACE_HYPHEN_APOSTROPHE, mockErrorMessage, mockErrors);

        const expected = generateValidationErrors(mockFieldId, mockErrorMessage, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe('when a string contains special characters', () => {
      it('should return generateValidationErrors', () => {
        const mockFieldValue = `mock ${mockSpecialCharacters}`;

        const result = regexValidation(mockFieldValue, mockFieldId, REGEX.ALPHA_CHARACTERS_AND_SPACE_HYPHEN_APOSTROPHE, mockErrorMessage, mockErrors);

        const expected = generateValidationErrors(mockFieldId, mockErrorMessage, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe('when a string contains numbers and special characters', () => {
      it('should return generateValidationErrors', () => {
        const mockFieldValue = `mock 123 ${mockSpecialCharacters}`;

        const result = regexValidation(mockFieldValue, mockFieldId, REGEX.ALPHA_CHARACTERS_AND_SPACE_HYPHEN_APOSTROPHE, mockErrorMessage, mockErrors);

        const expected = generateValidationErrors(mockFieldId, mockErrorMessage, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe('when a string only contains letters and spaces', () => {
      it('should return false', () => {
        const mockValidFieldValue = 'Example valid string';

        const result = regexValidation(mockValidFieldValue, mockFieldId, REGEX.ALPHA_CHARACTERS_AND_SPACE_HYPHEN_APOSTROPHE, mockErrorMessage, mockErrors);

        expect(result).toEqual(false);
      });
    });

    describe('when a string only contains letters and hyphens', () => {
      it('should return false', () => {
        const mockValidFieldValue = 'Example-valid-string';

        const result = regexValidation(mockValidFieldValue, mockFieldId, REGEX.ALPHA_CHARACTERS_AND_SPACE_HYPHEN_APOSTROPHE, mockErrorMessage, mockErrors);

        expect(result).toEqual(false);
      });
    });

    describe('when a string only contains letters and apostrophies', () => {
      it('should return false', () => {
        const mockValidFieldValue = "Example'valid'string";

        const result = regexValidation(mockValidFieldValue, mockFieldId, REGEX.ALPHA_CHARACTERS_AND_SPACE_HYPHEN_APOSTROPHE, mockErrorMessage, mockErrors);

        expect(result).toEqual(false);
      });
    });

    describe('when a string only contains letters, spaces, hyphens and apostrophies', () => {
      it('should return false', () => {
        const mockValidFieldValue = "Example '-'valid'-'string";

        const result = regexValidation(mockValidFieldValue, mockFieldId, REGEX.ALPHA_CHARACTERS_AND_SPACE_HYPHEN_APOSTROPHE, mockErrorMessage, mockErrors);

        expect(result).toEqual(false);
      });
    });
  });
});
