import { radios } from '../../pages/shared';
import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';

const { CURRENCY_CODE } = INSURANCE_FIELD_IDS.CURRENCY;

/**
 * completeAndSubmitAlternativeCurrencyForm
 * presses hyperlink and completes the alternative currency form
 * if isoCode provided - clicks the radio for currency and submits alternative currency form
 * if alternativeCurrency true, then enters alternative currency and submits alternative currency form
 * @param {String} isoCode: isoCode provided for radio selection
 * @param {Boolean} alternativeCurrency: if alternative currency should be entered
 */
const completeAndSubmitAlternativeCurrencyForm = ({ isoCode, alternativeCurrency }) => {
  if (isoCode) {
    cy.clickProvideAlternativeCurrencyLink();

    radios(CURRENCY_CODE, isoCode).option.label().click();
    cy.clickSubmitButton();
  }

  if (alternativeCurrency) {
    cy.clickProvideAlternativeCurrencyLink();

    cy.clickAlternativeCurrencyRadioAndSubmitCurrency({});
  }
};

export default completeAndSubmitAlternativeCurrencyForm;
