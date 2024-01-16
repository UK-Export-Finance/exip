import { EUR, GBP, JPY, USD } from '../../../../../constants';
import mapSelectOption from '../../../map-select-option';
import { Currency } from '../../../../../../types';

/**
 * mapAndSortCurrencies
 * Map all currencies into the required structure for GOV select component.
 * We also need to manually sort the currencies to meet design.
 * The currencies need to be specifically ordered - not alphabetically.
 * @param {Array} currencies: Array of currency objects
 * @param {String} selectedValue: Selected currency
 * @returns {Array} Mapped and sorted currencies
 */
const mapAndSortCurrencies = (currencies: Array<Currency>, selectedValue?: string) => {
  const renderValueInText = true;

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
  const sortedCurrencies = [currenciesObject[GBP], currenciesObject[EUR], currenciesObject[USD], currenciesObject[JPY]];

  return sortedCurrencies;
};

export default mapAndSortCurrencies;
