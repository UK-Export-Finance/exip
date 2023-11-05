import getFullNameString from '.';
import { mockAccount } from '../../test-mocks';

describe('api/helpers/get-full-name-string', () => {
  const { firstName, lastName } = mockAccount;

  it('should return firstName and lastName as a string', () => {
    const result = getFullNameString(mockAccount);

    const expected = `${firstName} ${lastName}`;

    expect(result).toEqual(expected);
  });
});
