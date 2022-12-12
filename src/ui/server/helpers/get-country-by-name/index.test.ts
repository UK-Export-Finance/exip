import getCountryByName from '.';
import { mockCountries } from '../../test-mocks';

describe('server/helpers/get-country-by-name', () => {
  it('should return a mapped object', () => {
    const result = getCountryByName(mockCountries, 'Mock B');

    const expected = mockCountries[1];

    expect(result).toEqual(expected);
  });
});
