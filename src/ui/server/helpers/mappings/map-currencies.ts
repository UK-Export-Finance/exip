import mapSelectOption from './map-select-option';
import sortArrayAlphabetically from '../sort-array-alphabetically';
import { Currency } from '../../../types';

/**
 * mapCurrencies
 * Map all currencies into the required structure for GOV select component.
 * @param {Array} Array of currency objects
 * @returns {String} Selected currency
 * @returns {Array} Array of mapped currencies, ordered alphabetically
 */
const mapCountries = (currencies: Array<Currency>, selectedValue?: string) => {
  const mapped = currencies.map(({ name, isoCode }) => mapSelectOption(name, isoCode, true, selectedValue));

  const sortedCurrencies = sortArrayAlphabetically(mapped, 'text');

  if (!selectedValue) {
    const defaultOption = {
      disabled: true,
      selected: true,
      value: '',
    };

    const result = [defaultOption, ...sortedCurrencies];

    return result;
  }

  return sortedCurrencies;
};

export default mapCountries;
