/**
 * checks currency radio has correct label and isoCode value for alternative currency page
 * @param {Function} Cypress selector
 * @param {object} currency
 */
const checkCurrencyOption = (selector, currency) => {
  const textValue = `${currency.name} (${currency.isoCode})`;

  cy.checkTextAndValue({
    textSelector: selector.label(),
    expectedText: textValue,
    valueSelector: selector,
    expectedValue: currency.isoCode,
  });
};

export default checkCurrencyOption;
