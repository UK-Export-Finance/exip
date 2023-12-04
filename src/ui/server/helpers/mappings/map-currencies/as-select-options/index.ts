import getSupportedCurrencies from '../map-supported-currencies';
import mapSelectOption from '../../map-select-option';
import sortArrayAlphabetically from '../../../sort-array-alphabetically';
import { Currency } from '../../../../../types';

/**
 * mapCurrenciesAsSelectOptions
 * Map all currencies into the required structure for GOV select component.
 * @param {Array} Array of currency objects
 * @param {String} Selected currency
 * @returns {Array} Array of mapped currencies
 */
const mapCurrenciesAsSelectOptions = (currencies: Array<Currency>, selectedValue?: string) => {
  const supportedCurrencies = getSupportedCurrencies(currencies);

  const mapped = supportedCurrencies.map(({ name, isoCode }) => mapSelectOption(name, isoCode, true, selectedValue));

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

export default mapCurrenciesAsSelectOptions;
