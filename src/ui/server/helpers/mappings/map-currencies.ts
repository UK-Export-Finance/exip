import mapSelectOption from './map-select-option';
import { Currency } from '../../../types';

/**
 * mapCurrencies
 * Map all currencies into the required structure for GOV select component.
 * @param {Array} currencies: Array of currency objects
 * @param {String} selectedValue: Selected currency
 * @returns {Array} Array of mapped currencies
 */
const mapCurrencies = (currencies: Array<Currency>, selectedValue?: string) => {
  const renderValueInText = true;
  const mappedCurrencies = currencies.map(({ name, isoCode }) => mapSelectOption(name, isoCode, renderValueInText, selectedValue));

  if (!selectedValue) {
    const defaultOption = {
      disabled: true,
      selected: true,
      value: '',
    };

    return [defaultOption, ...mappedCurrencies];
  }

  return mappedCurrencies;
};

export default mapCurrencies;
