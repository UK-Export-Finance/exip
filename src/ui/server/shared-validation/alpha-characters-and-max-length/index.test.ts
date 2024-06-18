import alphaCharactersAndMaxLength from '.';
import alphaCharactersOnlyValidation from '../alpha-characters-only';
import maxLengthValidation from '../max-length';
import emptyFieldValidation from '../empty-field';
import { mockErrors, mockErrorMessagesObject } from '../../test-mocks';

const mockMaxLength = 20;

describe('shared-validation/alpha-characters-and-max-length', () => {
  const FIELD_ID = 'field';

  const mockBody = {};

  describe('when a value is empty', () => {
    it('should return the result of emptyFieldValidation', () => {
      const result = alphaCharactersAndMaxLength(mockBody, FIELD_ID, mockErrorMessagesObject, mockErrors, mockMaxLength);

      const expected = emptyFieldValidation(mockBody, FIELD_ID, mockErrorMessagesObject.IS_EMPTY, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when a value contains a special character', () => {
    it('should return the result of alphaCharactersOnlyValidation', () => {
      mockBody[FIELD_ID] = 'a!';

      const result = alphaCharactersAndMaxLength(mockBody, FIELD_ID, mockErrorMessagesObject, mockErrors, mockMaxLength);

      const expected = alphaCharactersOnlyValidation(mockBody[FIELD_ID], FIELD_ID, mockErrorMessagesObject.INCORRECT_FORMAT, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when a value contains a number', () => {
    it('should return the result of alphaCharactersOnlyValidation', () => {
      mockBody[FIELD_ID] = 'a1';

      const result = alphaCharactersAndMaxLength(mockBody, FIELD_ID, mockErrorMessagesObject, mockErrors, mockMaxLength);

      const expected = alphaCharactersOnlyValidation(mockBody[FIELD_ID], FIELD_ID, mockErrorMessagesObject.INCORRECT_FORMAT, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when a value is over the maximum', () => {
    it('should return the result of maxLengthValidation', () => {
      mockBody[FIELD_ID] = 'a'.repeat(mockMaxLength + 1);

      const result = alphaCharactersAndMaxLength(mockBody, FIELD_ID, mockErrorMessagesObject, mockErrors, mockMaxLength);

      const expected = maxLengthValidation(mockBody[FIELD_ID], FIELD_ID, mockErrorMessagesObject.ABOVE_MAXIMUM, mockErrors, mockMaxLength);

      expect(result).toEqual(expected);
    });
  });

  describe('when a value is valid', () => {
    it('should return the provided errors', () => {
      mockBody[FIELD_ID] = 'Mock name';

      const result = alphaCharactersAndMaxLength(mockBody, FIELD_ID, mockErrorMessagesObject, mockErrors, mockMaxLength);

      expect(result).toEqual(mockErrors);
    });
  });
});
