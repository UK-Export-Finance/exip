import { SUPPORTED_CURRENCIES } from '../../constants';
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
 * 1) Filter supported currencies.
 * 2) Sort the currencies alphabetically.
 * @param {Array} Array of currency objects
 * @returns {Array} Array supported currencies
 */
const mapCurrencies = (currencies: Array<Currency>) => {
  const supportedCurrencies = getSupportedCurrencies(currencies);

  const sorted = sortArrayAlphabetically(supportedCurrencies, 'name');

  return sorted;
};

export default mapCurrencies;
