import emailValidation, { MAXIMUM } from '.';
import generateValidationErrors from '../../helpers/validation';
import maxLengthValidation from '../max-length';
import { mockErrorMessagesObject, mockErrors } from '../../test-mocks';

const validEmail = 'mock@email.com';

describe('shared-validation/email', () => {
  const mockFieldId = 'email';

  describe('when the email is empty', () => {
    const mockValue = '';

    describe('when an IS_EMPTY message is available', () => {
      it('should return validation error with IS_EMPTY message', () => {
        const result = emailValidation(mockFieldId, mockValue, mockErrorMessagesObject, mockErrors);

        const expected = generateValidationErrors(mockFieldId, mockErrorMessagesObject.IS_EMPTY, mockErrors);

        expect(result).toEqual(expected);
      });
    });

    describe('when an IS_EMPTY message is NOT available', () => {
      it('should return validation error with INCORRECT_FORMAT message', () => {
        const mockErrorMessagesNoIsEmpty = {
          ...mockErrorMessagesObject,
          IS_EMPTY: '',
        };

        const result = emailValidation(mockFieldId, mockValue, mockErrorMessagesNoIsEmpty, mockErrors);

        const expected = generateValidationErrors(mockFieldId, mockErrorMessagesNoIsEmpty.INCORRECT_FORMAT, mockErrors);

        expect(result).toEqual(expected);
      });
    });
  });

  describe('when email does not contain an @ symbol', () => {
    it('should return validation error', () => {
      const mockValue = 'mockemail.com';

      const result = emailValidation(mockFieldId, mockValue, mockErrorMessagesObject, mockErrors);

      const expected = generateValidationErrors(mockFieldId, mockErrorMessagesObject.INCORRECT_FORMAT, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when email does not contain at least one dot', () => {
    it('should return validation error', () => {
      const mockValue = 'mock@emailcom';

      const result = emailValidation(mockFieldId, mockValue, mockErrorMessagesObject, mockErrors);

      const expected = generateValidationErrors(mockFieldId, mockErrorMessagesObject.INCORRECT_FORMAT, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when email contains a space', () => {
    it('should return validation error', () => {
      const mockValue = 'mock @email.com';

      const result = emailValidation(mockFieldId, mockValue, mockErrorMessagesObject, mockErrors);

      const expected = generateValidationErrors(mockFieldId, mockErrorMessagesObject.INCORRECT_FORMAT, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when email does not contain a domain', () => {
    it('should return validation error', () => {
      const mockValue = 'mock@email';

      const result = emailValidation(mockFieldId, mockValue, mockErrorMessagesObject, mockErrors);

      const expected = generateValidationErrors(mockFieldId, mockErrorMessagesObject.INCORRECT_FORMAT, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe(`when email is over ${MAXIMUM} characters`, () => {
    it('should return the results of maxLengthValidation', () => {
      const suffix = '@email.com';

      const extraCharactersLength = MAXIMUM - suffix.length + 1;

      const mockValue = `${'a'.repeat(extraCharactersLength)}${suffix}`;

      const result = emailValidation(mockFieldId, mockValue, mockErrorMessagesObject, mockErrors);

      const expected = maxLengthValidation(mockValue, mockFieldId, mockErrorMessagesObject.ABOVE_MAXIMUM, mockErrors, MAXIMUM);

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no validation errors', () => {
    it('should return the provided errors object', () => {
      const result = emailValidation(mockFieldId, validEmail, mockErrorMessagesObject, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});
