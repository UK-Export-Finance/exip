/**
 * checks currency radio has correct label and isoCode value for alternative currency page
 * @param {Function} Cypress selector
 * @param {Object} currency
 */
const checkCurrencyOption = (selector, currency) => {
  const textValue = `${currency.name} (${currency.isoCode})`;
  cy.checkTextAndValue(selector.label(), textValue, selector, currency.isoCode);
};

export default checkCurrencyOption;
