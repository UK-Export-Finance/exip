import mapAndSortCurrencies from './map-and-sort-currencies';
import { Currency } from '../../../../../types';

/**
 * mapCurrenciesAsSelectOptions
 * Map all currencies into the required structure for GOV select component.
 * @param {Array} currencies: Array of currency objects
 * @param {String} selectedValue: Selected currency
 * @returns {Array} Array of mapped and sorted currencies
 */
const mapCurrenciesAsSelectOptions = (currencies: Array<Currency>, selectedValue?: string) => {
  const mappedCurrencies = mapAndSortCurrencies(currencies, selectedValue);

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
