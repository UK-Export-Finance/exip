import getCountryByIsoCode from '.';
import { mockCountries } from '../../test-mocks';

describe('server/helpers/get-country-by-iso-code', () => {
  it('should return a mapped object', () => {
    const mockIsoCode = mockCountries[2].isoCode;

    const result = getCountryByIsoCode(mockCountries, mockIsoCode);
    const { 2: expectedCountry } = mockCountries;

    const { isoCode, name } = expectedCountry;

    const expected = {
      isoCode,
      name,
    };

    expect(result).toEqual(expected);
  });
});
