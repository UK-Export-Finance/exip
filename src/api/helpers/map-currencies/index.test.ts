import mapCurrencies, { getSupportedCurrencies } from '.';
import { FIELD_IDS, SUPPORTED_CURRENCIES } from '../../constants';
import sortArrayAlphabetically from '../sort-array-alphabetically';
import mockCurrencies from '../../test-mocks/mock-currencies';

describe('helpers/map-currencies', () => {
  describe('getSupportedCurrencies', () => {
    it('should only return supported currencies via SUPPORTED_CURRENCIES constants', () => {
      const result = getSupportedCurrencies(mockCurrencies);

      const expected = mockCurrencies.filter((currency) => SUPPORTED_CURRENCIES.find((currencyCode: string) => currency.isoCode === currencyCode));

      expect(result).toEqual(expected);
    });
  });

  describe('mapCurrencies', () => {
    it('should return an array of currencies sorted alphabetically', () => {
      const result = mapCurrencies(mockCurrencies);

      const supportedCurrencies = getSupportedCurrencies(mockCurrencies);

      const expected = sortArrayAlphabetically(supportedCurrencies, FIELD_IDS.NAME);

      expect(result).toEqual(expected);
    });
  });
});
