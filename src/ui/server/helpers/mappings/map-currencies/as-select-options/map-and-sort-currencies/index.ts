import { EUR, GBP, JPY, USD } from '../../../../../constants';
import mapSelectOption from '../../../map-select-option';
import { Currency } from '../../../../../../types';

/**
 * mapAndSortCurrencies
 * Map currencies into the required structure for GOV select component.
 * if not all currencies, then need to manually sort the currencies to meet design.
 * The currencies need to be specifically ordered - not alphabetically.
 * if all currencies, then map all currencies into required structure
 * @param {Array} currencies: Array of currency objects
 * @param {String} selectedValue: Selected currency
 * @param {Boolean} allCurrencies: if all currencies need to be mapped
 * @returns {Array} Mapped and sorted currencies
 */
const mapAndSortCurrencies = (currencies: Array<Currency>, selectedValue?: string, allCurrencies?: boolean) => {
  const renderValueInText = true;
  let sortedCurrencies;

  /**
   * if not all currencies, then manually sorted to meet design
   * if all currencies, then map all currencies into the required structure for GOV select component
   */
  if (!allCurrencies) {
    /**
     * 1) Create an initial currencies object
     * 2) Loop over each currency
     * 3) Push a mapped currency to the object with an isoCode key
     */
    const currenciesObject = {};

    currencies.forEach((currency: Currency) => {
      const { name, isoCode } = currency;

      currenciesObject[currency.isoCode] = mapSelectOption(name, isoCode, renderValueInText, selectedValue);
    });

    /**
     * Define an array of sorted currencies.
     * This is required to meet design requirements.
     */
    sortedCurrencies = [currenciesObject[GBP], currenciesObject[EUR], currenciesObject[USD], currenciesObject[JPY]];
  } else {
    sortedCurrencies = currencies.map(({ name, isoCode }) => mapSelectOption(name, isoCode, true, selectedValue));

    if (!selectedValue) {
      const defaultOption = {
        disabled: true,
        selected: true,
        value: '',
      };

      const result = [defaultOption, ...sortedCurrencies];

      return result;
    }
  }

  return sortedCurrencies;
};

export default mapAndSortCurrencies;
