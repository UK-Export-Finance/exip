import { CisCountry } from '../../../types';
import { mapCountriesSelect } from './map-countries-select';

describe('server/helpers/mappings/map-countries-select', () => {
  const mockCountries = [
    {
      marketName: 'Abu Dhabi',
      isoCode: 'XAD',
      shortTermCoverAvailabilityDesc: 'A',
      ESRAClasificationDesc: 'B',
      NBIIssue: 'C',
    },
    {
      marketName: 'Algeria',
      isoCode: 'DZA',
      oecdRiskCategory: 2,
      shortTermCoverAvailabilityDesc: 'D',
      ESRAClasificationDesc: 'E',
      NBIIssue: 'F',
    },
  ] as Array<CisCountry>;

  describe('getSupportedCurrencies', () => {
    it('should only return supported currencies (GBP, EUR, USD)', () => {
      const result = mapCountriesSelect(mockCountries);

      const expected = [
        {
          disabled: true,
          selected: true,
          value: '',
        },
        {
          text: 'Abu Dhabi',
          value: 'XAD',
        },
        {
          text: 'Algeria',
          value: 'DZA',
        },
      ];

      expect(result[0]).toEqual(expected[0]);
    });
  });
});
