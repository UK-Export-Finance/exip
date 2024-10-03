import { radios } from '../../pages/shared';
import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';

const { CURRENCY_CODE } = INSURANCE_FIELD_IDS.CURRENCY;

/**
 * completeAndSubmitAlternativeCurrencyForm
 * conditionally clicks "alternative currency" hyperlink and completes the alternative currency form
 * if isoCode provided - clicks the radio for currency and submits alternative currency form
 * if alternativeCurrency true, then enters alternative currency and submits alternative currency form
 * @param {String} isoCode: isoCode for radio selection.
 * @param {Boolean} alternativeCurrency: If alternative currency should be entered.
 */

// TODO: update alternativeCurrency to be false by default.
const completeAndSubmitAlternativeCurrencyForm = ({ isoCode, alternativeCurrency = true }) => {
  if (isoCode) {
    radios(CURRENCY_CODE, isoCode).option.label().click();
    cy.clickSubmitButton();
  }

  if (alternativeCurrency) {
    cy.clickAlternativeCurrencyRadioAndSubmitCurrency({ currency: isoCode });
  }

  if (!isoCode && !alternativeCurrency) {
    cy.clickSubmitButton();
  }
};

export default completeAndSubmitAlternativeCurrencyForm;
