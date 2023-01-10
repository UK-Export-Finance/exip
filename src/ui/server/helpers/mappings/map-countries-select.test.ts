import mockCisCountries from '../../test-mocks/mock-cis-countries';
import { mapCountriesSelect } from './map-countries-select';

describe('server/helpers/mappings/map-countries-select', () => {
  describe('getCountries', () => {
    it('should return countries (XAD, DZA, EZY)', () => {
      const result = mapCountriesSelect(mockCisCountries);

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
        {
          text: 'Egypt',
          value: 'EGY',
        },
        {
          text: 'Gabon',
          value: 'GAB',
        },
      ];

      expect(result).toEqual(expected);
    });
  });
});
