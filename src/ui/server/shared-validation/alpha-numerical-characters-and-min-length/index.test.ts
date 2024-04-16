import alphaNumericalCharactersAndMinLength from '.';
import alphaNumericalCharactersOnlyValidation from '../alpha-numerical-characters-only';
import minLengthValidation from '../min-length';
import emptyFieldValidation from '../empty-field';
import { mockErrors, mockErrorMessagesObject } from '../../test-mocks';

const mockMinLength = 1;

describe('shared-validation/alpha-numerical-characters-and-min-length', () => {
  const FIELD_ID = 'field';

  const mockBody = {};

  describe('when a value is empty', () => {
    it('should return the result of emptyFieldValidation', () => {
      const result = alphaNumericalCharactersAndMinLength(mockBody, FIELD_ID, mockErrorMessagesObject, mockErrors, mockMinLength);

      const expected = emptyFieldValidation(mockBody, FIELD_ID, mockErrorMessagesObject.IS_EMPTY, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when a value contains a special character', () => {
    it('should return the result of alphaNumericalCharactersOnlyValidation', () => {
      mockBody[FIELD_ID] = 'a!';

      const result = alphaNumericalCharactersAndMinLength(mockBody, FIELD_ID, mockErrorMessagesObject, mockErrors, mockMinLength);

      const expected = alphaNumericalCharactersOnlyValidation(mockBody[FIELD_ID], FIELD_ID, mockErrorMessagesObject.INCORRECT_FORMAT, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when a value contains a number', () => {
    it('should return the result of alphaNumericalCharactersOnlyValidation', () => {
      mockBody[FIELD_ID] = 'a1';

      const result = alphaNumericalCharactersAndMinLength(mockBody, FIELD_ID, mockErrorMessagesObject, mockErrors, mockMinLength);

      const expected = alphaNumericalCharactersOnlyValidation(mockBody[FIELD_ID], FIELD_ID, mockErrorMessagesObject.INCORRECT_FORMAT, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when a value is over the maximum', () => {
    it('should return the result of minLengthValidation', () => {
      mockBody[FIELD_ID] = 'a'.repeat(mockMinLength + 1);

      const result = alphaNumericalCharactersAndMinLength(mockBody, FIELD_ID, mockErrorMessagesObject, mockErrors, mockMinLength);

      const expected = minLengthValidation(mockBody[FIELD_ID], FIELD_ID, mockErrorMessagesObject.BELOW_MINIMUM, mockErrors, mockMinLength);

      expect(result).toEqual(expected);
    });
  });

  describe('when a value is valid', () => {
    it('should return the provided errors', () => {
      mockBody[FIELD_ID] = 'Mock name';

      const result = alphaNumericalCharactersAndMinLength(mockBody, FIELD_ID, mockErrorMessagesObject, mockErrors, mockMinLength);

      expect(result).toEqual(mockErrors);
    });
  });
});
