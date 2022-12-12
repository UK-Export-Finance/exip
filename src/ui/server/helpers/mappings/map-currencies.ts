import { SUPPORTED_CURRENCIES } from '../../constants';
import sortArrayAlphabetically from '../sort-array-alphabetically';
import { Currency } from '../../../types';

/**
 * getSupportedCurrencies
 * Get all supported currencies
 * @param {Array} Array of all possible currencies
 * @returns {Array} Array of currencies that EXIP supports
 */
const getSupportedCurrencies = (currencies: Array<Currency>) => {
  const supported = currencies.filter((currency) => SUPPORTED_CURRENCIES.find((currencyCode: string) => currency.isoCode === currencyCode));

  return supported;
};

/**
 * mapCurrencies
 * Map all currencies and mark if it's selected
 * @param {Array} Array of currency objects
 * @returns {String} Selected credit period value
 * @returns {Array} Array of mapped currencies
 */
const mapCurrencies = (currencies: Array<Currency>, selectedValue?: string) => {
  const supportedCurrencies = getSupportedCurrencies(currencies);

  const mapped = supportedCurrencies.map(({ name, isoCode }) => {
    if (selectedValue && selectedValue === isoCode) {
      return {
        text: `${isoCode} - ${name}`,
        value: isoCode,
        selected: true,
      };
    }

    return {
      text: `${isoCode} - ${name}`,
      value: isoCode,
    };
  });

  const sorted = sortArrayAlphabetically(mapped, 'text');

  if (!selectedValue) {
    const defaultOption = {
      disabled: true,
      selected: true,
      value: '',
    };

    const result = [defaultOption, ...sorted];

    return result;
  }

  const result = sorted;

  return result;
};

export { getSupportedCurrencies, mapCurrencies };
