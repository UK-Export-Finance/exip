import mapCisCountries, { filterCisCountries } from '.';
import mapCisCountry from './map-CIS-country';
import { EXTERNAL_API_DEFINITIONS, EXTERNAL_API_MAPPINGS } from '../../constants';
import sortArrayAlphabetically from '../sort-array-alphabetically';
import mockCisCountries from '../../test-mocks/mock-CIS-countries';

const { CIS } = EXTERNAL_API_DEFINITIONS;

describe('helpers/map-CIS-countries', () => {
  const { 1: initialMockCountry } = mockCisCountries;

  const mockCountryBase = {
    ...initialMockCountry,
    marketName: initialMockCountry.marketName,
    riskCategory: EXTERNAL_API_MAPPINGS.CIS.RISK.STANDARD,
    isoCode: initialMockCountry.isoCode,
    shortTermCoverAvailabilityDesc: CIS.SHORT_TERM_COVER_AVAILABLE.ILC,
  };

  describe('filterCisCountries', () => {
    it('should return a list of countries without invalid countries defined in INVALID_CIS_COUNTRIES', () => {
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
        {
          ...mockCountryBase,
          marketName: 'Eastern and Southern African Trade and Development Bank',
        },
      ];

      const result = filterCisCountries(mockCountriesWithInvalid);

      const expected = [mockCountryBase];

      expect(result).toEqual(expected);
    });
  });

  describe('mapCisCountries', () => {
    it('should returns array of filtered, mapped and sorted objects', () => {
      const filteredCountries = filterCisCountries(mockCisCountries);

      const result = mapCisCountries(filteredCountries);

      const mapped = filteredCountries.map((country) => mapCisCountry(country));

      const expected = sortArrayAlphabetically(mapped, 'name');

      expect(result).toEqual(expected);
    });
  });
});
