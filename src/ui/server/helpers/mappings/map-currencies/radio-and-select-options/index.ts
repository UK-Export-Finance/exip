import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import mapCurrenciesAsRadioOptions from '../as-radio-options';
import mapCurrenciesAsSelectOptions from '../as-select-options';
import { Currency } from '../../../../../types';
import submittedAnswer from '../submitted-answer';

const {
  CURRENCY: { ALTERNATIVE_CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

/**
 * mapRadioAndSelectOptions
 * Create an object of mapped currencies into the required structure for GOV radio and select components
 * This is used for forms that have both currency radio inputs, and an alternative currency select component
 * @param {Array} alternativeCurrencies: Array of alternative currencies
 * @param {Array} currencies: Array of supported currencies
 * @param {String} selectedValue: Selected currency
 * @returns {Object} Mapped currencies and applicationAnswer
 */
const mapRadioAndSelectOptions = (alternativeCurrencies: Array<Currency>, supportedCurrencies: Array<Currency>, selectedValue?: string) => {
  const mapped = {
    currencies: mapCurrenciesAsRadioOptions(supportedCurrencies, ALTERNATIVE_CURRENCY_CODE),
    alternativeCurrencies: mapCurrenciesAsSelectOptions(alternativeCurrencies, selectedValue, true),
    applicationAnswer: submittedAnswer(selectedValue),
  };

  return mapped;
};

export default mapRadioAndSelectOptions;
