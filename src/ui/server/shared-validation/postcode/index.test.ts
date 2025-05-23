import postcodeValidation from '.';
import generateValidationErrors from '../../helpers/validation';
import { mockErrors } from '../../test-mocks';

describe('shared-validation/postcode', () => {
  const mockFieldId = 'postcode';
  const mockErrorMessageEmpty = 'Is empty';
  const mockErrorMessageFormat = 'Incorrect format';

  describe('when the postcode is empty', () => {
    it('should return a validation error', () => {
      const mockValue = '';

      const result = postcodeValidation(mockFieldId, mockValue, mockErrorMessageEmpty, mockErrorMessageFormat, mockErrors);

      const expected = generateValidationErrors(mockFieldId, mockErrorMessageEmpty, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when the postcode has 1 letter in the first part', () => {
    it('should return a validation error', () => {
      const mockValue = 'S 2AA';

      const result = postcodeValidation(mockFieldId, mockValue, mockErrorMessageEmpty, mockErrorMessageFormat, mockErrors);

      const expected = generateValidationErrors(mockFieldId, mockErrorMessageFormat, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when the postcode has no letters in the first part', () => {
    it('should return a validation error', () => {
      const mockValue = '22 2AA';

      const result = postcodeValidation(mockFieldId, mockValue, mockErrorMessageEmpty, mockErrorMessageFormat, mockErrors);

      const expected = generateValidationErrors(mockFieldId, mockErrorMessageFormat, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when the postcode has 2 digits in the second part', () => {
    it('should return a validation error', () => {
      const mockValue = 'SW1 22A';

      const result = postcodeValidation(mockFieldId, mockValue, mockErrorMessageEmpty, mockErrorMessageFormat, mockErrors);

      const expected = generateValidationErrors(mockFieldId, mockErrorMessageFormat, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when the postcode has 3 digits in the second part', () => {
    it('should return a validation error', () => {
      const mockValue = 'SW1 222';

      const result = postcodeValidation(mockFieldId, mockValue, mockErrorMessageEmpty, mockErrorMessageFormat, mockErrors);

      const expected = generateValidationErrors(mockFieldId, mockErrorMessageFormat, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when the postcode has all letters in the second part', () => {
    it('should return a validation error', () => {
      const mockValue = 'SW1 AAA';

      const result = postcodeValidation(mockFieldId, mockValue, mockErrorMessageEmpty, mockErrorMessageFormat, mockErrors);

      const expected = generateValidationErrors(mockFieldId, mockErrorMessageFormat, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when the postcode has more than 7 characters', () => {
    it('should return a validation error', () => {
      const mockValue = 'SW1A 2HQA';

      const result = postcodeValidation(mockFieldId, mockValue, mockErrorMessageEmpty, mockErrorMessageFormat, mockErrors);

      const expected = generateValidationErrors(mockFieldId, mockErrorMessageFormat, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no validation errors', () => {
    describe('when the postcode has a space', () => {
      it('should return the provided errors object', () => {
        const mockValue = 'SW1A 2HQ';

        const result = postcodeValidation(mockFieldId, mockValue, mockErrorMessageEmpty, mockErrorMessageFormat, mockErrors);

        expect(result).toEqual(mockErrors);
      });
    });

    describe('when the postcode does not have a space', () => {
      it('should return the provided errors object', () => {
        const mockValue = 'SW1A2HQ';

        const result = postcodeValidation(mockFieldId, mockValue, mockErrorMessageEmpty, mockErrorMessageFormat, mockErrors);

        expect(result).toEqual(mockErrors);
      });
    });

    describe('when the postcode has 5 characters', () => {
      it('should return the provided errors object', () => {
        const mockValue = 'L1 8JQ';

        const result = postcodeValidation(mockFieldId, mockValue, mockErrorMessageEmpty, mockErrorMessageFormat, mockErrors);

        expect(result).toEqual(mockErrors);
      });
    });

    describe('when the postcode has 6 characters', () => {
      it('should return the provided errors object', () => {
        const mockValue = 'KT3 3QQ';

        const result = postcodeValidation(mockFieldId, mockValue, mockErrorMessageEmpty, mockErrorMessageFormat, mockErrors);

        expect(result).toEqual(mockErrors);
      });
    });
  });
});
