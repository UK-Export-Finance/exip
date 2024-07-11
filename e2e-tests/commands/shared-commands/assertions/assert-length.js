/**
 * assertLength
 * Assert that total length of some elements.
 * @param {Object} selector: Cypress selector
 * @param {Integer} expectedLength: Expected amount
 */
const assertLength = (selector, expectedLength) => {
  selector.should('have.length', expectedLength);
};

export default assertLength;
