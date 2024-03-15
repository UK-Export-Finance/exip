import fullAddress from '.';
import { MAXIMUM_CHARACTERS } from '../../constants';
import providedAndMaxLength from '../provided-and-max-length';
import { mockErrorMessagesObject, mockErrors } from '../../test-mocks';
import { RequestBody } from '../../../types';

describe('shared-validation/full-address', () => {
  const FIELD_ID = 'field';

  const mockBody = {
    [FIELD_ID]: 'Mock name',
  } as RequestBody;

  it('should return the result of providedAndMaxLength', () => {
    const response = fullAddress(mockBody, FIELD_ID, mockErrorMessagesObject, mockErrors);

    const expected = providedAndMaxLength(mockBody, FIELD_ID, mockErrorMessagesObject, mockErrors, MAXIMUM_CHARACTERS.FULL_ADDRESS);

    expect(response).toEqual(expected);
  });
});
