/**
 * checkAriaLabel
 * Check an element's aria label
 * @param {Function} Cypress selector
 * @param {String} Expected message
 */
const checkAriaLabel = (selector, expectedMessage) => {
  selector.invoke('attr', 'aria-label').then((text) => {
    expect(text.trim()).equal(expectedMessage);
  });
};

export default checkAriaLabel;
