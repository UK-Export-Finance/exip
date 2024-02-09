/**
 * checkValue
 * Check an input's value
 * @param {Function} selector: Cypress selector
 * @param {String} expectedValue: Expected value
 */
const checkValue = (selector, expectedValue) => {
  selector.input().should('have.value', expectedValue);
};

export default checkValue;
