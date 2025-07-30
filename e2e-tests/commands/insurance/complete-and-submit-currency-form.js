import { radios } from '../../pages/shared';
import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import { NON_STANDARD_CURRENCY_CODE } from '../../fixtures/currencies';

const { CURRENCY_CODE } = INSURANCE_FIELD_IDS.CURRENCY;

/**
 * completeAndSubmitCurrencyForm
 * conditionally clicks "alternative currency" radio and selects an alternative currency
 * if isoCode provided - clicks the radio for currency and submits alternative currency form
 * if alternativeCurrency true, then enters alternative currency and submits alternative currency form
 * @param {string} isoCode: isoCode for radio selection.
 * @param {boolean} alternativeCurrency: If alternative currency should be entered.
 */
const completeAndSubmitCurrencyForm = ({ isoCode, alternativeCurrency = false }) => {
  if (isoCode) {
    radios(CURRENCY_CODE, isoCode).option.label().click();
    cy.clickSubmitButton();
  }

  if (alternativeCurrency) {
    cy.clickAlternativeCurrencyRadioAndSubmitCurrency({ currency: NON_STANDARD_CURRENCY_CODE });
  }

  if (!isoCode && !alternativeCurrency) {
    cy.clickSubmitButton();
  }
};

export default completeAndSubmitCurrencyForm;
