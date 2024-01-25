import nameValidation from '.';
import alphaCharactersOnlyValidation from '../alpha-characters-only';
import maxLengthValidation from '../max-length';
import emptyFieldValidation from '../empty-field';
import { ACCOUNT_FIELDS } from '../../content-strings/fields/insurance/account';
import { RequestBody } from '../../../types';

const {
  MAXIMUM: {
    NAME: { CHARACTERS: MAX_CHARACTERS },
  },
} = ACCOUNT_FIELDS;

describe('shared-validation/name', () => {
  const FIELD_ID = 'field';

  const mockErrors = {
    summary: [],
    errorList: {},
  };

  const mockBody = {
    [FIELD_ID]: '',
  } as RequestBody;

  const mockErrorMessages = {
    IS_EMPTY: 'Is empty',
    INCORRECT_FORMAT: 'Incorrect format',
    BELOW_MINIMUM: 'Below minimum',
    ABOVE_MAXIMUM: 'Above minimum',
  };

  describe('when a name contains a special character', () => {
    it('should return the result of alphaCharactersOnlyValidation', () => {
      mockBody[FIELD_ID] = 'a!';

      const response = nameValidation(mockBody, FIELD_ID, mockErrorMessages, mockErrors);

      const expected = alphaCharactersOnlyValidation(mockBody[FIELD_ID], FIELD_ID, mockErrorMessages.INCORRECT_FORMAT, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe('when a name contains a number', () => {
    it('should return the result of alphaCharactersOnlyValidation', () => {
      mockBody[FIELD_ID] = 'a1';

      const response = nameValidation(mockBody, FIELD_ID, mockErrorMessages, mockErrors);

      const expected = alphaCharactersOnlyValidation(mockBody[FIELD_ID], FIELD_ID, mockErrorMessages.INCORRECT_FORMAT, mockErrors);

      expect(response).toEqual(expected);
    });
  });

  describe('when a name is over the maximum', () => {
    it('should return the result of maxLengthValidation', () => {
      mockBody[FIELD_ID] = 'a'.repeat(MAX_CHARACTERS + 1);

      const response = nameValidation(mockBody, FIELD_ID, mockErrorMessages, mockErrors);

      const expected = maxLengthValidation(mockBody[FIELD_ID], FIELD_ID, mockErrorMessages.ABOVE_MAXIMUM, mockErrors, MAX_CHARACTERS);

      expect(response).toEqual(expected);
    });
  });

  describe('when a name is empty', () => {
    it('should return the result of emptyFieldValidation', () => {
      const response = nameValidation(mockBody, FIELD_ID, mockErrorMessages, mockErrors);

      const expected = emptyFieldValidation(mockBody, FIELD_ID, mockErrorMessages.IS_EMPTY, mockErrors);

      expect(response).toEqual(expected);
    });
  });
});
