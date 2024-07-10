import nameValidation from '.';
import alphaCharactersAndMaxLengthValidation from '../alpha-characters-and-max-length';
import { ACCOUNT_FIELDS } from '../../content-strings/fields/insurance/account';
import { mockErrorMessagesObject, mockErrors } from '../../test-mocks';
import { RequestBody } from '../../../types';

const {
  MAXIMUM: {
    NAME: { CHARACTERS: MAX_CHARACTERS },
  },
} = ACCOUNT_FIELDS;

describe('shared-validation/name', () => {
  const FIELD_ID = 'field';

  const mockBody = {
    [FIELD_ID]: 'Mock name',
  } as RequestBody;

  it('should return the result of alphaCharactersAndMaxLengthValidation', () => {
    const response = nameValidation(mockBody, FIELD_ID, mockErrorMessagesObject, mockErrors);

    const expected = alphaCharactersAndMaxLengthValidation(mockBody, FIELD_ID, mockErrorMessagesObject, mockErrors, MAX_CHARACTERS);

    expect(response).toEqual(expected);
  });
});
