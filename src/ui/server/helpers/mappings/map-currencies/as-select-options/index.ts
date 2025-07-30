import mapAndSortCurrencies from './map-and-sort-currencies';
import { Currency } from '../../../../../types';

/**
 * mapCurrenciesAsSelectOptions
 * Map all currencies into the required structure for GOV select component.
 * @param {Array<Currency>} currencies: Array of currency objects
 * @param {string} selectedValue: Selected currency
 * @param {boolean} alternativeCurrencies: if alternative currencies are being mapped - default to false
 * @returns {Array} Array of mapped and sorted currencies
 */
const mapCurrenciesAsSelectOptions = (currencies: Array<Currency>, selectedValue?: string, alternativeCurrencies = false) => {
  const mappedCurrencies = mapAndSortCurrencies(currencies, selectedValue, alternativeCurrencies);

  if (!selectedValue) {
    const defaultOption = {
      disabled: true,
      selected: true,
      value: '',
    };

    const result = [defaultOption, ...mappedCurrencies];

    return result;
  }

  return mappedCurrencies;
};

export default mapCurrenciesAsSelectOptions;
