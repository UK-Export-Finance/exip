import { isValidPostcode } from '.';
import { INVALID_POSTCODES, VALID_POSTCODES } from '../../test-mocks/mock-postcodes';

describe('isValidPostcode', () => {
  describe('valid postcode', () => {
    it('should return true', () => {
      const response = isValidPostcode(VALID_POSTCODES.WITHOUT_SPACE);

      expect(response).toEqual(true);
    });
  });

  describe('invalid postcode', () => {
    it('should return false when first part has too few letters', () => {
      const response = isValidPostcode(INVALID_POSTCODES.ONE_LETTER_FIRST_PART);

      expect(response).toEqual(false);
    });

    it('should return false when first part has no letters in the first part', () => {
      const response = isValidPostcode(INVALID_POSTCODES.NO_LETTERS_FIRST_PART);

      expect(response).toEqual(false);
    });

    it('should return false when first part has 2 digits in the second part', () => {
      const response = isValidPostcode(INVALID_POSTCODES.TWO_DIGITS_SECOND_PART);

      expect(response).toEqual(false);
    });

    it('should return false when the postcode has all letters in the second part', () => {
      const response = isValidPostcode(INVALID_POSTCODES.ALL_LETTERS_SECOND_PART);

      expect(response).toEqual(false);
    });

    it('should return false when the postcode has too many characters', () => {
      const response = isValidPostcode(INVALID_POSTCODES.TOO_MANY_CHARACTERS);

      expect(response).toEqual(false);
    });

    it('should return false when the postcode has too few characters', () => {
      const response = isValidPostcode(INVALID_POSTCODES.TOO_FEW_CHARACTERS);

      expect(response).toEqual(false);
    });
  });
});
