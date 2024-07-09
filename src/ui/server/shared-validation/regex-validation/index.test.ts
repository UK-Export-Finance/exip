import regexValidation from '.';
import generateValidationErrors from '../../helpers/validation';
import { REGEX } from '../../constants';

const mockFieldId = 'mockId';
const mockErrorMessage = 'Mock error';
const mockErrors = {};
const mockSpecialCharacters = '!@£$%^&*()?';

describe('shared-validation/regex-validation', () => {
  describe('ALPHA_CHARACTERS_AND_SPACE', () => {
    const regex =  REGEX.ALPHA_CHARACTERS_AND_SPACE;

    describe('when a string contains numbers', () => {
      it('should return generateValidationErrors', () => {
        const mockFieldValue = 'mock 123';

        const result = regexValidation(mockFieldValue, mockFieldId, regex, mockErrorMessage, mockErrors);

        const expected = generateValidationErrors(mockFieldId, mockErrorMessage, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe('when a string contains special characters', () => {
      it('should return generateValidationErrors', () => {
        const mockFieldValue = `mock ${mockSpecialCharacters}`;

        const result = regexValidation(mockFieldValue, mockFieldId, regex, mockErrorMessage, mockErrors);

        const expected = generateValidationErrors(mockFieldId, mockErrorMessage, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe('when a string contains numbers and special characters', () => {
      it('should return generateValidationErrors', () => {
        const mockFieldValue = `mock 123 ${mockSpecialCharacters}`;

        const result = regexValidation(mockFieldValue, mockFieldId, regex, mockErrorMessage, mockErrors);

        const expected = generateValidationErrors(mockFieldId, mockErrorMessage, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe('when there are no validation errors', () => {
      it('should return false', () => {
        const mockValidFieldValue = 'Example valid string';

        const result = regexValidation(mockValidFieldValue, mockFieldId, regex, mockErrorMessage, mockErrors);

        expect(result).toEqual(false);
      });
    });
  });

  describe('ALPHA_CHARACTERS_AND_SPACE_HYPHEN_APOSTROPHE', () => {
    const regex =  REGEX.ALPHA_CHARACTERS_AND_SPACE_HYPHEN_APOSTROPHE;

    describe('when a string contains numbers', () => {
      it('should return generateValidationErrors', () => {
        const mockFieldValue = 'mock 123';

        const result = regexValidation(mockFieldValue, mockFieldId, regex, mockErrorMessage, mockErrors);

        const expected = generateValidationErrors(mockFieldId, mockErrorMessage, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe('when a string contains special characters', () => {
      it('should return generateValidationErrors', () => {
        const mockFieldValue = `mock ${mockSpecialCharacters}`;

        const result = regexValidation(mockFieldValue, mockFieldId, regex, mockErrorMessage, mockErrors);

        const expected = generateValidationErrors(mockFieldId, mockErrorMessage, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe('when a string contains numbers and special characters', () => {
      it('should return generateValidationErrors', () => {
        const mockFieldValue = `mock 123 ${mockSpecialCharacters}`;

        const result = regexValidation(mockFieldValue, mockFieldId, regex, mockErrorMessage, mockErrors);

        const expected = generateValidationErrors(mockFieldId, mockErrorMessage, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe('when a string only contains letters and spaces', () => {
      it('should return false', () => {
        const mockValidFieldValue = 'Example valid string';

        const result = regexValidation(mockValidFieldValue, mockFieldId, regex, mockErrorMessage, mockErrors);

        expect(result).toEqual(false);
      });
    });

    describe('when a string only contains letters and hyphens', () => {
      it('should return false', () => {
        const mockValidFieldValue = 'Example-valid-string';

        const result = regexValidation(mockValidFieldValue, mockFieldId, regex, mockErrorMessage, mockErrors);

        expect(result).toEqual(false);
      });
    });

    describe('when a string only contains letters and apostrophies', () => {
      it('should return false', () => {
        const mockValidFieldValue = "Example'valid'string";

        const result = regexValidation(mockValidFieldValue, mockFieldId, regex, mockErrorMessage, mockErrors);

        expect(result).toEqual(false);
      });
    });

    describe('when a string only contains letters, spaces, hyphens and apostrophies', () => {
      it('should return false', () => {
        const mockValidFieldValue = "Example '-'valid'-'string";

        const result = regexValidation(mockValidFieldValue, mockFieldId, regex, mockErrorMessage, mockErrors);

        expect(result).toEqual(false);
      });
    });
  });

  describe('NUMBER_HYPHEN_SPACE', () => {
    const regex = REGEX.NUMBER_HYPHEN_SPACE;

    describe('when the provided value has a letter', () => {
      it('should return a validation errors"', () => {
        const mockValidFieldValue = '11-22-3E';

        const result = regexValidation(mockValidFieldValue, mockFieldId, regex, mockErrorMessage, mockErrors);

        const expected = generateValidationErrors(mockFieldId, mockErrorMessage, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe('when the provided value has a special character', () => {
      it('should return a validation errors"', () => {
        const mockValidFieldValue = '11-22-3!';

        const result = regexValidation(mockValidFieldValue, mockFieldId, regex, mockErrorMessage, mockErrors);

        const expected = generateValidationErrors(mockFieldId, mockErrorMessage, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe('when the provided value has spaces', () => {
      it('should return false', () => {
        const mockValidFieldValue = '11 22 33';

        const result = regexValidation(mockValidFieldValue, mockFieldId, regex, mockErrorMessage, mockErrors);

        expect(result).toEqual(false);
      });
    });

    describe('when the provided value has spaces and hyphens', () => {
      it('should return false', () => {
        const mockValidFieldValue = '11 22-33';

        const result = regexValidation(mockValidFieldValue, mockFieldId, regex, mockErrorMessage, mockErrors);

        expect(result).toEqual(false);
      });
    });
  });
});
