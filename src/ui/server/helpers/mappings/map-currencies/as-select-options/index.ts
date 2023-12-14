import mapSelectOption from '../../map-select-option';
import { Currency } from '../../../../../types';

/**
 * mapCurrenciesAsSelectOptions
 * Map all currencies into the required structure for GOV select component.
 * @param {Array} Array of currency objects
 * @param {String} Selected currency
 * @returns {Array} Array of mapped currencies
 */
const mapCurrenciesAsSelectOptions = (currencies: Array<Currency>, selectedValue?: string) => {
  const renderValueInText = true;

  const mappedCurrencies = currencies.map(({ name, isoCode }) => mapSelectOption(name, isoCode, renderValueInText, selectedValue));

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
