import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import mapCurrenciesAsRadioOptions from '../as-radio-options';
import mapCurrenciesAsSelectOptions from '../as-select-options';
import { Currency } from '../../../../../types';

const {
  CURRENCY: { ALTERNATIVE_CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

/**
 * mapRadioAndSelectOptions
 * Create an object of mapped currencies into the required structure for GOV radio and select components
 * This is used for forms that have both currency radio inputs, and an alternative currency select component
 * @param {Array} currencies: Array of all currencies
 * @param {Array} currencies: Array of supported currencies
 * @param {String} selectedValue: Selected currency
 * @returns {Object} Mapped currencies
 */
const mapRadioAndSelectOptions = (allCurrencies: Array<Currency>, supportedCurrencies: Array<Currency>, selectedValue?: string) => {
  const mapped = {
    currencies: mapCurrenciesAsRadioOptions(supportedCurrencies, ALTERNATIVE_CURRENCY_CODE),
    allCurrencies: mapCurrenciesAsSelectOptions(allCurrencies, selectedValue, true),
  };

  return mapped;
};

export default mapRadioAndSelectOptions;
