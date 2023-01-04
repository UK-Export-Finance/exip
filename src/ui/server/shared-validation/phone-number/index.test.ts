import validatePhoneNumber from '.';
import generateValidationErrors from '../../helpers/validation';

describe('shared-validation/phone-number', () => {
  const errors = {};
  const fieldId = 'phone-number';
  const errorMessage = 'incorrect format';

  describe('with errors', () => {
    it('should display error when phone number is 999', () => {
      const phoneNumber = '999';

      const result = validatePhoneNumber(phoneNumber, fieldId, errorMessage, errors);
      const expected = generateValidationErrors(fieldId, errorMessage);

      expect(result).toEqual(expected);
    });

    it('should display error when landline number is too long', () => {
      const phoneNumber = '020727180101';

      const result = validatePhoneNumber(phoneNumber, fieldId, errorMessage, errors);
      const expected = generateValidationErrors(fieldId, errorMessage);

      expect(result).toEqual(expected);
    });

    it('should display error when landline number is too short', () => {
      const phoneNumber = '0207271801';

      const result = validatePhoneNumber(phoneNumber, fieldId, errorMessage, errors);
      const expected = generateValidationErrors(fieldId, errorMessage);

      expect(result).toEqual(expected);
    });

    it('should display error when mobile number is too long', () => {
      const phoneNumber = '074580452001';

      const result = validatePhoneNumber(phoneNumber, fieldId, errorMessage, errors);
      const expected = generateValidationErrors(fieldId, errorMessage);

      expect(result).toEqual(expected);
    });

    it('should display error when mobile number is too short', () => {
      const phoneNumber = '0745804520';

      const result = validatePhoneNumber(phoneNumber, fieldId, errorMessage, errors);
      const expected = generateValidationErrors(fieldId, errorMessage);

      expect(result).toEqual(expected);
    });

    it('should display error when mobile number has letters in it', () => {
      const phoneNumber = '07458O4520';

      const result = validatePhoneNumber(phoneNumber, fieldId, errorMessage, errors);
      const expected = generateValidationErrors(fieldId, errorMessage);

      expect(result).toEqual(expected);
    });

    it('should display error entering international number', () => {
      let result = validatePhoneNumber('0144513100', fieldId, errorMessage, errors);
      let expected = generateValidationErrors(fieldId, errorMessage);

      expect(result).toEqual(expected);

      result = validatePhoneNumber('+33144513100', fieldId, errorMessage, errors);
      expected = generateValidationErrors(fieldId, errorMessage);

      expect(result).toEqual(expected);

      result = validatePhoneNumber('0033144513100', fieldId, errorMessage, errors);
      expected = generateValidationErrors(fieldId, errorMessage);

      expect(result).toEqual(expected);
    });
  });

  describe('without errors', () => {
    it('should not display error if valid landline number', () => {
      const phoneNumber = '02072718010';

      const result = validatePhoneNumber(phoneNumber, fieldId, errorMessage, errors);

      expect(result).toEqual({});
    });

    it('should not display error if valid mobile number', () => {
      const phoneNumber = '07458045200';

      const result = validatePhoneNumber(phoneNumber, fieldId, errorMessage, errors);

      expect(result).toEqual({});
    });
  });
});
