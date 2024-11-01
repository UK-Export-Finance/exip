import nameValidation from '.';
import emptyFieldValidation from '../empty-field';
import alphaCharactersHyphenAndApostropheOnlyValidation from '../alpha-characters-hyphen-and-apostrophe-only';
import maxLengthValidation from '../max-length';
import { MAXIMUM_CHARACTERS } from '../../constants';
import { mockErrorMessagesObject, mockErrors } from '../../test-mocks';
import { RequestBody } from '../../../types';

const { ACCOUNT } = MAXIMUM_CHARACTERS;

describe('shared-validation/name', () => {
  const FIELD_ID = 'field';

  const mockBody = {
    [FIELD_ID]: 'Mock name',
  } as RequestBody;

  describe('when a value is empty', () => {
    it('should return the result of emptyFieldValidation', () => {
      const result = nameValidation(mockBody, FIELD_ID, mockErrorMessagesObject, mockErrors);

      const expected = emptyFieldValidation(mockBody, FIELD_ID, mockErrorMessagesObject.IS_EMPTY, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when a value contains a special character', () => {
    it('should return the result of alphaCharactersHyphenAndApostropheOnlyValidation', () => {
      mockBody[FIELD_ID] = 'a!';

      const result = nameValidation(mockBody, FIELD_ID, mockErrorMessagesObject, mockErrors);

      const expected = alphaCharactersHyphenAndApostropheOnlyValidation(mockBody[FIELD_ID], FIELD_ID, mockErrorMessagesObject.INCORRECT_FORMAT, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when a value contains a number', () => {
    it('should return the result of alphaCharactersOnlyValidation', () => {
      mockBody[FIELD_ID] = 'a1';

      const result = nameValidation(mockBody, FIELD_ID, mockErrorMessagesObject, mockErrors);

      const expected = alphaCharactersHyphenAndApostropheOnlyValidation(mockBody[FIELD_ID], FIELD_ID, mockErrorMessagesObject.INCORRECT_FORMAT, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when a value is over the maximum', () => {
    it('should return the result of maxLengthValidation', () => {
      mockBody[FIELD_ID] = 'a'.repeat(ACCOUNT.NAME + 1);

      const result = nameValidation(mockBody, FIELD_ID, mockErrorMessagesObject, mockErrors);

      const expected = maxLengthValidation(mockBody[FIELD_ID], FIELD_ID, mockErrorMessagesObject.ABOVE_MAXIMUM, mockErrors, ACCOUNT.NAME);

      expect(result).toEqual(expected);
    });
  });

  describe('when a value is valid', () => {
    it('should return the provided errors', () => {
      mockBody[FIELD_ID] = 'Mock name';

      const result = nameValidation(mockBody, FIELD_ID, mockErrorMessagesObject, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });

  describe('when a value is valid with hypens and apostrophies', () => {
    it('should return the provided errors', () => {
      mockBody[FIELD_ID] = "Mock-nam'e";

      const result = nameValidation(mockBody, FIELD_ID, mockErrorMessagesObject, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});
