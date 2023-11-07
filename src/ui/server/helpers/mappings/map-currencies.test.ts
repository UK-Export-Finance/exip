import { getSupportedCurrencies, mapCurrencies } from './map-currencies';
import sortArrayAlphabetically from '../sort-array-alphabetically';
import mapSelectOption from './map-select-option';
import { mockCurrencies } from '../../test-mocks';

describe('server/helpers/mappings/map-currencies', () => {
  describe('getSupportedCurrencies', () => {
    it('should only return supported currencies (GBP, EUR, USD)', () => {
      const result = getSupportedCurrencies(mockCurrencies);

      const expected = [mockCurrencies[0], mockCurrencies[2], mockCurrencies[3]];

      expect(result).toEqual(expected);
    });
  });

  describe('mapCurrencies', () => {
    const supportedCurrencies = getSupportedCurrencies(mockCurrencies);

    it('should return an array of mapped objects from mapSelectOption and with a default option', () => {
      const result = mapCurrencies(supportedCurrencies);

      const expectedSorted = sortArrayAlphabetically(
        supportedCurrencies.map(({ name, isoCode }) => mapSelectOption(name, isoCode, true)),
        'text',
      );

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
      it('should return an array of mapped objects from mapSelectOption and no default option', () => {
        const mockSelectedValue = mockCurrencies[1].isoCode;

        const result = mapCurrencies(mockCurrencies, mockSelectedValue);

        const expected = sortArrayAlphabetically(
          supportedCurrencies.map(({ name, isoCode }) => mapSelectOption(name, isoCode, true, mockSelectedValue)),
          'text',
        );

        expect(result).toEqual(expected);
      });
    });
  });
});
