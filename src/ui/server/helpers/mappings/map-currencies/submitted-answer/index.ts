import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import isNotAlternativeCurrency from '../is-not-alternative-currency';

const {
  CURRENCY: { ALTERNATIVE_CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

/**
 * submittedAnswer
 * if currency is supported, then should return the currency to prepopulate the radio
 * if currency is an alternative currency, then returns ALTERNATIVE_CURRENCY_CODE for radio to be selected
 * @param {String} currency
 * @returns {String} currency - empty string, currencyCode for supported currency or ALTERNATIVE_CURRENCY_CODE
 */
const submittedAnswer = (currency?: string) => {
  if (!currency) {
    return '';
  }

  if (isNotAlternativeCurrency(currency)) {
    return currency;
  }

  return ALTERNATIVE_CURRENCY_CODE;
};

export default submittedAnswer;
