/**
 * clickAlternativeCurrencyRadioAndSubmitCurrency
 * Complete and submit an "alternative currency" field
 * @param {string} fieldId: Field ID
 * @param {string} currency: Currency
 * @param {boolean} viaSaveAndBack: Flag whether to submit the form via the "save and back" button.
 */
const clickAlternativeCurrencyRadioAndSubmitCurrency = ({ fieldId, currency, viaSaveAndBack }) => {
  cy.clickAlternativeCurrencyRadioAndCompleteCurrency({ fieldId, currency });

  if (viaSaveAndBack) {
    cy.clickSaveAndBackButton();
  } else {
    cy.clickSubmitButton();
  }
};

export default clickAlternativeCurrencyRadioAndSubmitCurrency;
