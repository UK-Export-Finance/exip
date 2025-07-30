/**
 * checkTypeAttribute
 * Check an element's "type" attribute
 * @param {object} selector: Cypress selector
 * @param {string} expectedType: Expected type
 */
const checkTypeAttribute = (selector, expectedType) => {
  selector.should('have.attr', 'type', expectedType);
};

export default checkTypeAttribute;
