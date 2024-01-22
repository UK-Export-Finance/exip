import mapCurrencies, { getSupportedCurrencies, getAlternativeCurrencies } from '.';
import { FIELD_IDS, SUPPORTED_CURRENCIES } from '../../constants';
import sortArrayAlphabetically from '../sort-array-alphabetically';
import mockCurrencies, { HKD } from '../../test-mocks/mock-currencies';

describe('helpers/map-currencies', () => {
  describe('getSupportedCurrencies', () => {
    it('should only return supported currencies via SUPPORTED_CURRENCIES constants', () => {
      const result = getSupportedCurrencies(mockCurrencies);

      const expected = mockCurrencies.filter((currency) => SUPPORTED_CURRENCIES.find((currencyCode: string) => currency.isoCode === currencyCode));

      expect(result).toEqual(expected);
    });
  });

  describe('getAlternativeCurrencies', () => {
    it('should only return currencies not in SUPPORTED_CURRENCIES constants', () => {
      const result = getAlternativeCurrencies(mockCurrencies);

      const expected = [HKD];

      expect(result).toEqual(expected);
    });
  });

  describe('mapCurrencies', () => {
    describe('alternativeCurrencies as "false"', () => {
      it('should return an array of supported currencies sorted alphabetically', () => {
        const result = mapCurrencies(mockCurrencies, false);

        const supportedCurrencies = getSupportedCurrencies(mockCurrencies);

        const expected = sortArrayAlphabetically(supportedCurrencies, FIELD_IDS.NAME);

        expect(result).toEqual(expected);
      });
    });

    describe('alternativeCurrencies as "true"', () => {
      it('should return an array of alternative currencies sorted alphabetically', () => {
        const result = mapCurrencies(mockCurrencies, true);

        const currencies = getAlternativeCurrencies(mockCurrencies);
        const expected = sortArrayAlphabetically(currencies, FIELD_IDS.NAME);

        expect(result).toEqual(expected);
      });
    });
  });
});
