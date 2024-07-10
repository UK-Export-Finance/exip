/**
 * clickAlternativeCurrencyRadioAndCompleteCurrency
 * Click an "alternative currency" radio and complete the "currency" field.
 * @param {String} fieldId: Field ID
 * @param {String} currency: Currency
 */
const clickAlternativeCurrencyRadioAndCompleteCurrency = ({ fieldId, currency }) => {
  cy.clickAlternativeCurrencyRadioOption();

  cy.completeAlternativeCurrencyField({ fieldId, currency });
};

export default clickAlternativeCurrencyRadioAndCompleteCurrency;
