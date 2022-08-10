import {
  getSupportedCurrencies,
  mapCurrencies,
} from './map-currencies';
import sortArrayAlphabetically from '../sort-array-alphabetically';

describe('server/helpers/mappings/map-currencies', () => {
  const mockCurrencies = [
    {
      name: 'Euros',
      isoCode: 'EUR',
    },
    {
      name: 'US Dollars',
      isoCode: 'USD',
    },
    {
      name: 'UK Sterling',
      isoCode: 'GBP',
    },
    {
      name: 'Hong Kong Dollars',
      isoCode: 'HKD',
    },
  ];

  describe('getSupportedCurrencies', () => {
    it('should only return supported currencies (GBP, EUR, USD)', () => {
      const result = getSupportedCurrencies(mockCurrencies);

      const expected = [
        mockCurrencies[0],
        mockCurrencies[1],
        mockCurrencies[2],
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('mapCurrencies', () => {
    it('should return an array of mapped objects with a default option', () => {
      const supportedCurrencies = getSupportedCurrencies(mockCurrencies);
      const result = mapCurrencies(supportedCurrencies);

      const expectedSorted = sortArrayAlphabetically([
        {
          text: `${mockCurrencies[0].isoCode} - ${mockCurrencies[0].name}`,
          value: mockCurrencies[0].isoCode,
        },
        {
          text: `${mockCurrencies[1].isoCode} - ${mockCurrencies[1].name}`,
          value: mockCurrencies[1].isoCode,
        },
        {
          text: `${mockCurrencies[2].isoCode} - ${mockCurrencies[2].name}`,
          value: mockCurrencies[2].isoCode,
        },
      ], 'text');

      const expected = [
        {
          disabled: true,
          selected: true,
          value: '',
        },
        ...expectedSorted,
      ];

      expect(result).toEqual(expected);
    });

    describe('when a selectedValue is passed', () => {
      it('should return an array of mapped objects with selected option and no default option', () => {
        const mockSelectedValue = mockCurrencies[1].isoCode;

        const result = mapCurrencies(mockCurrencies, mockSelectedValue);

        const expected = sortArrayAlphabetically([
          {
            text: `${mockCurrencies[0].isoCode} - ${mockCurrencies[0].name}`,
            value: mockCurrencies[0].isoCode,
          },
          {
            text: `${mockCurrencies[1].isoCode} - ${mockCurrencies[1].name}`,
            value: mockCurrencies[1].isoCode,
            selected: true,
          },
          {
            text: `${mockCurrencies[2].isoCode} - ${mockCurrencies[2].name}`,
            value: mockCurrencies[2].isoCode,
          },
        ], 'text');

        expect(result).toEqual(expected);
      });
    });
  });
});
