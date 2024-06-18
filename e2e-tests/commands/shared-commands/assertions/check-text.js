/**
 * checkText
 * Check an element's text
 * @param {Function} selector: Cypress selector
 * @param {String} expected: Expected text
 */
const checkText = (selector, expected) => {
  selector.invoke('text').then((text) => {
    expect(text.trim()).equal(expected);
  });
};

export default checkText;
