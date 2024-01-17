import { FIELD_IDS, SUPPORTED_CURRENCIES } from '../../constants';
import sortArrayAlphabetically from '../sort-array-alphabetically';
import { Currency } from '../../types';

/**
 * getSupportedCurrencies
 * Get all supported currencies
 * @param {Array} Array of all possible currencies
 * @returns {Array} Array of currencies that EXIP supports
 */
export const getSupportedCurrencies = (currencies: Array<Currency>) => {
  const supported = currencies.filter((currency) => SUPPORTED_CURRENCIES.find((currencyCode: string) => currency.isoCode === currencyCode));

  return supported;
};

/**
 * mapCurrencies
 * Map and sort currencies.
 * 1) if allCurrencies flag set, then will return all currencies
 * 2) if allCurrencies flag not set, then will filter supported currencies.
 * 3) Sort the currencies alphabetically.
 * @param {Array} Array of currency objects
 * @param {Boolean} allCurrencies if all currencies should be returned
 * @returns {Array} Array supported currencies
 */
const mapCurrencies = (currencies: Array<Currency>, allCurrencies: boolean) => {
  let currenciesArray = currencies;

  // if not all currencies, then get the supported currencies only
  if (!allCurrencies) {
    currenciesArray = getSupportedCurrencies(currencies);
  }

  const sorted = sortArrayAlphabetically(currenciesArray, FIELD_IDS.NAME);

  return sorted;
};

export default mapCurrencies;
