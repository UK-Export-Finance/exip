import filterCisEntries from '.';
import { EXTERNAL_API_DEFINITIONS } from '../../constants';
import { mockCisCountries, mockCurrencies } from '../../test-mocks';

const { CIS } = EXTERNAL_API_DEFINITIONS;

describe('helpers/filter-cis-entries', () => {
  const { 1: initialMockCountry } = mockCisCountries;

  const mockCountryBase = {
    ...initialMockCountry,
    marketName: initialMockCountry.marketName,
  };

  it('should return a list of countries without invalid countries defined in CIS.INVALID_COUNTRIES', () => {
    const mockCountriesWithInvalid = [
      mockCountryBase,
      {
        ...mockCountryBase,
        marketName: 'EC Market n/k',
      },
      {
        ...mockCountryBase,
        marketName: 'Non EC Market n/k',
      },
      {
        ...mockCountryBase,
        marketName: 'Non UK',
      },
      {
        ...mockCountryBase,
        marketName: 'Third Country',
      },
    ];

    const result = filterCisEntries(mockCountriesWithInvalid, CIS.INVALID_COUNTRIES, 'marketName');

    const expected = [mockCountryBase];

    expect(result).toEqual(expected);
  });

  it('should return a list of currencies without invalid currencies defined in CIS.INVALID_CURRENCIES', () => {
    const mockCurrenciesWithInvalid = [
      ...mockCurrencies,
      {
        name: 'Gold',
        isoCode: 'XAU',
      },
    ];

    const result = filterCisEntries(mockCurrenciesWithInvalid, CIS.INVALID_CURRENCIES, 'name');

    const expected = mockCurrencies;

    expect(result).toEqual(expected);
  });
});
