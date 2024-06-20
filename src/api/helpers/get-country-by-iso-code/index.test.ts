import getCountryByIsoCode from '.';
import { mockCountries } from '../../test-mocks';

describe('helpers/get-country-by-iso-code', () => {
  it('should return a country', () => {
    const mockIsoCode = mockCountries[2].isoCode;

    const result = getCountryByIsoCode(mockCountries, mockIsoCode);

    const { 2: expectedCountry } = mockCountries;

    expect(result).toEqual(expectedCountry);
  });
});
