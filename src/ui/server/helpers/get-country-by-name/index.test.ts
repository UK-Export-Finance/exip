import getCountryByName from '.';
import { mockCountries } from '../../test-mocks';

describe('server/helpers/get-country-by-name', () => {
  it('should return a mapped object', () => {
    const mockName = mockCountries[1].name;

    const result = getCountryByName(mockCountries, mockName);

    const expected = mockCountries[1];

    expect(result).toEqual(expected);
  });
});
