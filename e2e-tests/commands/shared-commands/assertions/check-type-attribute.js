/**
 * checkTypeAttribute
 * Check an element's "type" attribute
 * @param {Object} selector: Cypress selector
 * @param {String} expectedType: Expected type
 */
const checkTypeAttribute = (selector, expectedType) => {
  selector.should('have.attr', 'type', expectedType);
};

export default checkTypeAttribute;
