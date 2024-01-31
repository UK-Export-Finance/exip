import { NON_STANDARD_CURRENCY_CODE } from '../../fixtures/currencies';
import { radios } from '../../pages/shared';
import partials from '../../partials';
import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';

const { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE } = INSURANCE_FIELD_IDS.CURRENCY;

/**
 * completeAndSubmitAlternativeCurrencyForm
 * presses hyperlink and completes the alternative currency form
 * if isoCode provided - clicks the radio for currency and submits alternative currency form
 * if alternativeCurrency true, then enters alternative currency and submits alternative currency form
 * @param {String} isoCode: isoCode provided for radio selection
 * @param {Boolean} alternativeCurrency: if alternative currency should be entered
 */
const completeAndSubmitAlternativeCurrencyForm = ({ isoCode, alternativeCurrency, linkFieldId }) => {
  if (isoCode) {
    // clicks alternative currency link
    partials.link(linkFieldId).click();

    // selects currency radio and submits form
    radios(CURRENCY_CODE, isoCode).option.input().click();
    cy.clickSubmitButton();
  }

  if (alternativeCurrency) {
    // clicks alternative currency link
    partials.link(linkFieldId).click();

    /**
     * clicks alternativeCurrency radio option
     * enters alternative currency into input
     * submits form
     */
    cy.clickAlternativeCurrencyRadioOption();
    cy.autocompleteKeyboardInput(ALTERNATIVE_CURRENCY_CODE, NON_STANDARD_CURRENCY_CODE);
    cy.clickSubmitButton();
  }
};

export default completeAndSubmitAlternativeCurrencyForm;
