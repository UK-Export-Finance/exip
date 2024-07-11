import alphaNumericalCharactersOnlyValidation from '.';
import generateValidationErrors from '../../helpers/validation';

const mockFieldId = 'mockId';
const mockErrorMessage = 'Mock error';
const mockErrors = {};
const mockSpecialCharacters = '!@£$%^&*()?';

describe('shared-validation/alpha-numerical-characters-only', () => {
  describe('invalid field values', () => {
    describe('when a string has only letters', () => {
      it('should return generateValidationErrors', () => {
        const mockFieldValue = 'MOCK';

        const result = alphaNumericalCharactersOnlyValidation(mockFieldValue, mockFieldId, mockErrorMessage, mockErrors);

        const expected = generateValidationErrors(mockFieldId, mockErrorMessage, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe('when a string has only numbers', () => {
      it('should return generateValidationErrors', () => {
        const mockFieldValue = '1234';

        const result = alphaNumericalCharactersOnlyValidation(mockFieldValue, mockFieldId, mockErrorMessage, mockErrors);

        const expected = generateValidationErrors(mockFieldId, mockErrorMessage, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe('when a string has only lowercase letters and numbers', () => {
      it('should return generateValidationErrors', () => {
        const mockFieldValue = 'mock123';

        const result = alphaNumericalCharactersOnlyValidation(mockFieldValue, mockFieldId, mockErrorMessage, mockErrors);

        const expected = generateValidationErrors(mockFieldId, mockErrorMessage, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe('when a string has only special characters', () => {
      it('should return generateValidationErrors', () => {
        const mockFieldValue = mockSpecialCharacters;

        const result = alphaNumericalCharactersOnlyValidation(mockFieldValue, mockFieldId, mockErrorMessage, mockErrors);

        const expected = generateValidationErrors(mockFieldId, mockErrorMessage, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe('when a string contains only letters and special characters', () => {
      it('should return generateValidationErrors', () => {
        const mockFieldValue = `MOCK${mockSpecialCharacters}`;

        const result = alphaNumericalCharactersOnlyValidation(mockFieldValue, mockFieldId, mockErrorMessage, mockErrors);

        const expected = generateValidationErrors(mockFieldId, mockErrorMessage, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe('when a string contains only numbers and special characters', () => {
      it('should return generateValidationErrors', () => {
        const mockFieldValue = `123${mockSpecialCharacters}`;

        const result = alphaNumericalCharactersOnlyValidation(mockFieldValue, mockFieldId, mockErrorMessage, mockErrors);

        const expected = generateValidationErrors(mockFieldId, mockErrorMessage, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe('when a string contains letters, numbers and special characters', () => {
      it('should return generateValidationErrors', () => {
        const mockFieldValue = `MOCK123${mockSpecialCharacters}`;

        const result = alphaNumericalCharactersOnlyValidation(mockFieldValue, mockFieldId, mockErrorMessage, mockErrors);

        const expected = generateValidationErrors(mockFieldId, mockErrorMessage, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe('when a string contains letters, numbers and an empty space', () => {
      it('should return generateValidationErrors', () => {
        const mockFieldValue = 'MOCK123 ';

        const result = alphaNumericalCharactersOnlyValidation(mockFieldValue, mockFieldId, mockErrorMessage, mockErrors);

        const expected = generateValidationErrors(mockFieldId, mockErrorMessage, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe('when a string contains letters, numbers, special characters and an empty space', () => {
      it('should return generateValidationErrors', () => {
        const mockFieldValue = `MOCK123${mockSpecialCharacters} `;

        const result = alphaNumericalCharactersOnlyValidation(mockFieldValue, mockFieldId, mockErrorMessage, mockErrors);

        const expected = generateValidationErrors(mockFieldId, mockErrorMessage, mockErrors);

        expect(result).toEqual(expected);
      });
    });
  });

  describe('valid field values', () => {
    describe('when a string contains only letters and numbers', () => {
      it('should return false', () => {
        const mockValidFieldValue = 'MOCK123';

        const result = alphaNumericalCharactersOnlyValidation(mockValidFieldValue, mockFieldId, mockErrorMessage, mockErrors);

        expect(result).toEqual(false);
      });
    });

    describe('when a string contains only letters and numbers (multiple places)', () => {
      it('should return false', () => {
        const mockValidFieldValue = 'ABC123DEF456';

        const result = alphaNumericalCharactersOnlyValidation(mockValidFieldValue, mockFieldId, mockErrorMessage, mockErrors);

        expect(result).toEqual(false);
      });
    });
  });
});
