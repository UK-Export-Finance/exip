import { SYMBOLS, NON_STANDARD_CURRENCY_CODE } from '../../../fixtures/currencies';
import { radios, field, yesRadioInput } from '../../../pages/shared';
import partials from '../../../partials';
import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';
import { YOUR_BUYER as FIELD_IDS } from '../../../constants/field-ids/insurance/your-buyer';

const { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE } = INSURANCE_FIELD_IDS.CURRENCY;

const { TOTAL_OUTSTANDING, AMOUNT_OVERDUE } = FIELD_IDS;

/**
 * assertOutstandingPaymentsCurrency
 * checks the currency prefix for total outstanding and amount overdue on the trading history page
 * if isoCode provided - clicks the radio for currency and submits alternative currency form and asserts correct symbol is displayed
 * if alternativeCurrency true, then enters alternative currency and submits alternative currency form and asserts no currency symbol is displayed
 * if no isoCode or alternative currency provided - then asserts that GBP symbol is displayed
 * @param {String} isoCode - isoCode provided for radio selection
 * @param {String} currencySymbol - currency symbol to be displayed - defaults to GBP
 * @param {Boolean} alternativeCurrency - if alternative currency should be entered
 */
const assertOutstandingPaymentsCurrency = ({ isoCode, currencySymbol = SYMBOLS.GBP, alternativeCurrency }) => {
  // clicks yes radio for total outstanding
  yesRadioInput().first().click();

  if (isoCode) {
    // clicks alternative currency link
    partials.link('provide-alternative-currency').click();

    // selects currency radio and submits form
    radios(CURRENCY_CODE, isoCode).option.input().click();
    cy.clickSubmitButton();

    // clicks yes radio for total outstanding
    yesRadioInput().first().click();

    // asserts correct prefix displayed
    cy.checkText(field(TOTAL_OUTSTANDING).prefix(), currencySymbol);
    cy.checkText(field(AMOUNT_OVERDUE).prefix(), currencySymbol);

    /**
     * if alternative currency
     */
  } else if (alternativeCurrency) {
    // clicks alternative currency link
    partials.link('provide-alternative-currency').click();

    /**
     * clicks alternativeCurrency radio option
     * enters alternative currency into input
     * submits form
     */
    cy.clickAlternativeCurrencyRadioOption();
    cy.autocompleteKeyboardInput(ALTERNATIVE_CURRENCY_CODE, NON_STANDARD_CURRENCY_CODE);
    cy.clickSubmitButton();

    // clicks yes radio for total outstanding
    yesRadioInput().first().click();

    // asserts no prefix displayed
    field(TOTAL_OUTSTANDING).prefix().should('not.exist');
    field(AMOUNT_OVERDUE).prefix().should('not.exist');

    /**
     * if no isoCode or alternativeCurrency selected
     * checks GBP displayed
     */
  } else {
    cy.checkText(field(TOTAL_OUTSTANDING).prefix(), currencySymbol);
    cy.checkText(field(AMOUNT_OVERDUE).prefix(), currencySymbol);
  }
};

export default assertOutstandingPaymentsCurrency;
