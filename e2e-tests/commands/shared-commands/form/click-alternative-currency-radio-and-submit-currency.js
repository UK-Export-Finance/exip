/**
 * clickAlternativeCurrencyRadioAndSubmitCurrency
 * Complete and submit an "alternative currency" field
 * @param {String} fieldId: Field ID
 * @param {String} currency: Currency
 */
const clickAlternativeCurrencyRadioAndSubmitCurrency = ({ fieldId, currency }) => {
  cy.clickAlternativeCurrencyRadioAndCompleteCurrency({ fieldId, currency });

  cy.clickSubmitButton();
};

export default clickAlternativeCurrencyRadioAndSubmitCurrency;
