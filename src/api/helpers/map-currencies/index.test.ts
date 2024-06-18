import mapCurrencies, { getSupportedCurrencies, getAlternativeCurrencies } from '.';
import { EXTERNAL_API_DEFINITIONS, FIELD_IDS, SUPPORTED_CURRENCIES } from '../../constants';
import filterCisEntries from '../filter-cis-entries';
import sortArrayAlphabetically from '../sort-array-alphabetically';
import { Currency } from '../../types';
import mockCurrencies, { HKD } from '../../test-mocks/mock-currencies';

const { CIS } = EXTERNAL_API_DEFINITIONS;

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
    const filteredCurrencies = filterCisEntries(mockCurrencies, CIS.INVALID_CURRENCIES, 'name') as Array<Currency>;

    describe('alternativeCurrencies as "false"', () => {
      it('should return an array of filtered, supported currencies, sorted alphabetically', () => {
        const result = mapCurrencies(mockCurrencies, false);

        const supportedCurrencies = getSupportedCurrencies(filteredCurrencies);

        const expected = sortArrayAlphabetically(supportedCurrencies, FIELD_IDS.NAME);

        expect(result).toEqual(expected);
      });
    });

    describe('alternativeCurrencies as "true"', () => {
      it('should return an array of filtered, alternative currencies, sorted alphabetically', () => {
        const result = mapCurrencies(mockCurrencies, true);

        const currencies = getAlternativeCurrencies(filteredCurrencies);

        const expected = sortArrayAlphabetically(currencies, FIELD_IDS.NAME);

        expect(result).toEqual(expected);
      });
    });
  });
});
