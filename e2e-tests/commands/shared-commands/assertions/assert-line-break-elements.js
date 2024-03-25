/**
 * assertTotalLineBreakElements
 * Assert that line break elements are rendered.
 * @param {Object} selector: Cypress selector
 * @param {Integer} expectedLineBreaks: Expected amount of line breaks
 */
const assertLineBreakElements = (selector, expectedLineBreaks) => {
  selector.should('have.length', expectedLineBreaks);
};

export default assertLineBreakElements;
