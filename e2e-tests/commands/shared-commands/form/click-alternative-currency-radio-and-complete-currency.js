/**
 * clickAlternativeCurrencyRadioAndCompleteCurrency
 * Click an "alternative currency" radio and complete the "currency" field.
 * @param {string} fieldId: Field ID
 * @param {string} currency: Currency
 */
const clickAlternativeCurrencyRadioAndCompleteCurrency = ({ fieldId, currency }) => {
  cy.clickAlternativeCurrencyRadioOption();

  cy.completeAlternativeCurrencyField({ fieldId, currency });
};

export default clickAlternativeCurrencyRadioAndCompleteCurrency;
