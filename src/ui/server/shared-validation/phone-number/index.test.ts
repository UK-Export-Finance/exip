import validatePhoneNumber from '.';
import generateValidationErrors from '../../helpers/validation';
import { mockPhoneNumbers } from '../../test-mocks';

const { INVALID_PHONE_NUMBERS, VALID_PHONE_NUMBERS } = mockPhoneNumbers;

describe('shared-validation/phone-number', () => {
  const errors = {};
  const fieldId = 'phone-number';
  const errorMessage = 'incorrect format';

  describe('with errors', () => {
    it(`should display error when phone number is ${INVALID_PHONE_NUMBERS.EMERGENCY_NUMBER}`, () => {
      const result = validatePhoneNumber(INVALID_PHONE_NUMBERS.EMERGENCY_NUMBER, fieldId, errorMessage, errors);
      const expected = generateValidationErrors(fieldId, errorMessage);

      expect(result).toEqual(expected);
    });

    it('should display error when landline number is too long', () => {
      const result = validatePhoneNumber(INVALID_PHONE_NUMBERS.LANDLINE_LONG, fieldId, errorMessage, errors);
      const expected = generateValidationErrors(fieldId, errorMessage);

      expect(result).toEqual(expected);
    });

    it('should display error when landline number is too short', () => {
      const result = validatePhoneNumber(INVALID_PHONE_NUMBERS.LANDLINE_SHORT, fieldId, errorMessage, errors);
      const expected = generateValidationErrors(fieldId, errorMessage);

      expect(result).toEqual(expected);
    });

    it('should display error when mobile number is too long', () => {
      const result = validatePhoneNumber(INVALID_PHONE_NUMBERS.MOBILE_LONG, fieldId, errorMessage, errors);
      const expected = generateValidationErrors(fieldId, errorMessage);

      expect(result).toEqual(expected);
    });

    it('should display error when number has letters in it', () => {
      const result = validatePhoneNumber(INVALID_PHONE_NUMBERS.LANDLINE_LETTER, fieldId, errorMessage, errors);
      const expected = generateValidationErrors(fieldId, errorMessage);

      expect(result).toEqual(expected);
    });

    it('should display error when number has special characters in it', () => {
      const result = validatePhoneNumber(INVALID_PHONE_NUMBERS.LANDLINE_SPECIAL_CHAR, fieldId, errorMessage, errors);
      const expected = generateValidationErrors(fieldId, errorMessage);

      expect(result).toEqual(expected);
    });

    it('should display error entering international number', () => {
      let result = validatePhoneNumber(INVALID_PHONE_NUMBERS.INTERNATIONAL, fieldId, errorMessage, errors);
      let expected = generateValidationErrors(fieldId, errorMessage);

      expect(result).toEqual(expected);

      result = validatePhoneNumber(INVALID_PHONE_NUMBERS.INTERNATIONAL_PLUS, fieldId, errorMessage, errors);
      expected = generateValidationErrors(fieldId, errorMessage);

      expect(result).toEqual(expected);

      result = validatePhoneNumber(INVALID_PHONE_NUMBERS.INTERNATIONAL_SHORT, fieldId, errorMessage, errors);
      expected = generateValidationErrors(fieldId, errorMessage);

      expect(result).toEqual(expected);
    });

    it('should display error entering just 2 digits', () => {
      const result = validatePhoneNumber(INVALID_PHONE_NUMBERS.TOO_SHORT, fieldId, errorMessage, errors);
      const expected = generateValidationErrors(fieldId, errorMessage);

      expect(result).toEqual(expected);
    });

    it('should display error entering just 2 digits with a special character', () => {
      const result = validatePhoneNumber(INVALID_PHONE_NUMBERS.TOO_SHORT_SPECIAL_CHAR, fieldId, errorMessage, errors);
      const expected = generateValidationErrors(fieldId, errorMessage);

      expect(result).toEqual(expected);
    });

    it('should display error entering mobile number with a special character', () => {
      const result = validatePhoneNumber(INVALID_PHONE_NUMBERS.MOBILE_SPECIAL_CHAR, fieldId, errorMessage, errors);
      const expected = generateValidationErrors(fieldId, errorMessage);

      expect(result).toEqual(expected);
    });

    it('should display error entering mobile number which is above 191 characters', () => {
      const result = validatePhoneNumber(INVALID_PHONE_NUMBERS.ABOVE_MAX_CHARS, fieldId, errorMessage, errors);
      const expected = generateValidationErrors(fieldId, errorMessage);

      expect(result).toEqual(expected);
    });
  });

  describe('without errors', () => {
    it('should not display error if valid landline number', () => {
      const result = validatePhoneNumber(VALID_PHONE_NUMBERS.LANDLINE, fieldId, errorMessage, errors);

      expect(result).toEqual({});
    });

    it('should not display error if valid landline number with brackets', () => {
      const result = validatePhoneNumber(VALID_PHONE_NUMBERS.LANDLINE_BRACKETS, fieldId, errorMessage, errors);

      expect(result).toEqual({});
    });

    it('should not display error if valid landline number with dashes', () => {
      const result = validatePhoneNumber(VALID_PHONE_NUMBERS.LANDLINE_DASHES, fieldId, errorMessage, errors);

      expect(result).toEqual({});
    });

    it('should not display error if valid full landline number without 0s', () => {
      const result = validatePhoneNumber(VALID_PHONE_NUMBERS.LANDLINE_FULL_NO_ZEROS, fieldId, errorMessage, errors);

      expect(result).toEqual({});
    });

    it('should not display error if valid full landline number', () => {
      const result = validatePhoneNumber(VALID_PHONE_NUMBERS.LANDLINE_FULL, fieldId, errorMessage, errors);

      expect(result).toEqual({});
    });

    it('should not display error if valid mobile number', () => {
      const result = validatePhoneNumber(VALID_PHONE_NUMBERS.MOBILE, fieldId, errorMessage, errors);

      expect(result).toEqual({});
    });

    it('should not display error if valid mobile number with dashes', () => {
      const result = validatePhoneNumber(VALID_PHONE_NUMBERS.MOBILE_DASH, fieldId, errorMessage, errors);

      expect(result).toEqual({});
    });

    it('should not display error if valid mobile number with full code', () => {
      const result = validatePhoneNumber(VALID_PHONE_NUMBERS.MOBILE_FULL_CODE, fieldId, errorMessage, errors);

      expect(result).toEqual({});
    });

    it('should not display error if valid mobile number with full code with brackets', () => {
      const result = validatePhoneNumber(VALID_PHONE_NUMBERS.MOBILE_FULL_CODE_BRACKET, fieldId, errorMessage, errors);

      expect(result).toEqual({});
    });
  });
});
