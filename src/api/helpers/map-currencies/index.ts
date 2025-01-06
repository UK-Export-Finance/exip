import { EXTERNAL_API_DEFINITIONS, FIELD_IDS, SUPPORTED_CURRENCIES } from '../../constants';
import filterCisEntries from '../filter-cis-entries';
import sortArrayAlphabetically from '../sort-array-alphabetically';
import { Currency } from '../../types';

const { CIS } = EXTERNAL_API_DEFINITIONS;

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
 * getAlternativeCurrencies
 * Get alternate currencies - not in SUPPORTED_CURRENCIES
 * @param {Array} Array of all possible currencies
 * @returns {Array} Array of alternate currencies
 */
export const getAlternativeCurrencies = (currencies: Array<Currency>) => {
  const alternate = currencies.filter((currency) => !SUPPORTED_CURRENCIES.includes(currency.isoCode));

  return alternate;
};

/**
 * mapCurrencies
 * Map and sort currencies.
 * 1) Filter out invalid CIS currencies.
 * 2) if alternativeCurrencies flag set, then will return all currencies.
 * 3) if alternativeCurrencies flag not set, then will filter supported currencies.
 * 4) Sort the currencies alphabetically.
 * @param {Array} Array of currency objects
 * @param {Boolean} alternativeCurrencies if alternate currencies should be returned
 * @returns {Array} Array supported currencies
 */
const mapCurrencies = (currencies: Array<Currency>, alternativeCurrencies: boolean) => {
  let currenciesArray = filterCisEntries(currencies, CIS.INVALID_CURRENCIES, 'name') as Array<Currency>;

  if (!alternativeCurrencies) {
    currenciesArray = getSupportedCurrencies(currenciesArray);
  } else {
    currenciesArray = getAlternativeCurrencies(currenciesArray);
  }

  const sorted = sortArrayAlphabetically(currenciesArray, FIELD_IDS.NAME);

  return sorted;
};

export default mapCurrencies;
