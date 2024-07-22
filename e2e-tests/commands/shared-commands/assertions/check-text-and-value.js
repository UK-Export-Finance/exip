/**
 * checkTextAndValue
 * Check the text and value of a selector
 * @param {Function} textSelector: Cypress selector for text
 * @param {String} expectedText: Expected text
 * @param {valueSelector} selector: Cypress selector for value
 * @param {String} expectedValue: Expected value
 */
const checkTextAndValue = (textSelector, expectedText, valueSelector, expectedValue) => {
  cy.checkText(textSelector, expectedText);
  cy.checkValue(valueSelector, expectedValue);
};

export default checkTextAndValue;
