/**
 * checkTextAndValue
 * Check the text and value of an element
 * @param {Function} textSelector: Cypress selector for text
 * @param {String} expectedText: Expected text
 * @param {Function} selector: Cypress selector for value
 * @param {String} expectedValue: Expected value
 */
const checkTextAndValue = ({ textSelector, expectedText, valueSelector, expectedValue }) => {
  cy.checkText(textSelector, expectedText);
  cy.checkValue(valueSelector, expectedValue);
};

export default checkTextAndValue;