/**
 * keyboardInput
 * Clear and type text into an input.
 * @param {Function} selector: Cypress selector
 * @param {String} text: Text to enter
 * @param {Boolean} viaValue: Flag for whether to input the text via the input's value attribute, instead of .type().
 */
const keyboardInput = (selector, text, viaValue = false) => {
  /**
   * If viaValue is provided, invoke the input's value, instead of using .type().
   * Otherwise, if the text contains empty spaces,
   * and the input is has a "type" attribute of "email",
   * cypress will automatically strip the empty spaces.
   * More information here: https://github.com/cypress-io/cypress/issues/1327
   */
  if (viaValue) {
    selector.clear().invoke('val', text); 
  } else {
    selector.clear().type(text, { delay: 0 }); 
  }
};

export default keyboardInput;
