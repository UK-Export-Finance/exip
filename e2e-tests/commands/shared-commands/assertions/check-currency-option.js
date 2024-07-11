/**
 * checks currency radio has correct label and isoCode value for alternative currency page
 * @param {Function} Cypress selector
 * @param {Object} currency
 */
const checkCurrencyOption = (selector, currency) => {
  cy.checkText(selector.label(), `${currency.name} (${currency.isoCode})`);
  cy.checkValue(selector, currency.isoCode);
};

export default checkCurrencyOption;
