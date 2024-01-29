import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { SUPPORTED_CURRENCIES } from '../../../../constants';
import mapCurrenciesAsRadioOptions from '../as-radio-options';
import mapCurrenciesAsSelectOptions from '../as-select-options';
import { Currency } from '../../../../../types';

const {
  CURRENCY: { ALTERNATIVE_CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

const isNotAlternativeCurrency = (currency?: string) => SUPPORTED_CURRENCIES.find((currencyCode: string) => currencyCode === currency);

const submittedAnswer = (currency?: string) => {
  if (!currency) {
    return '';
  }

  if (isNotAlternativeCurrency(currency)) {
    return currency;
  }

  return ALTERNATIVE_CURRENCY_CODE;
};

/**
 * mapRadioAndSelectOptions
 * Create an object of mapped currencies into the required structure for GOV radio and select components
 * This is used for forms that have both currency radio inputs, and an alternative currency select component
 * @param {Array} alternativeCurrencies: Array of alternative currencies
 * @param {Array} currencies: Array of supported currencies
 * @param {String} selectedValue: Selected currency
 * @returns {Object} Mapped currencies
 */
const mapRadioAndSelectOptions = (alternativeCurrencies: Array<Currency>, supportedCurrencies: Array<Currency>, selectedValue?: string) => {
  const mapped = {
    currencies: mapCurrenciesAsRadioOptions(supportedCurrencies, ALTERNATIVE_CURRENCY_CODE),
    alternativeCurrencies: mapCurrenciesAsSelectOptions(alternativeCurrencies, selectedValue, true),
    submittedValue: submittedAnswer(selectedValue),
  };

  return mapped;
};

export default mapRadioAndSelectOptions;
