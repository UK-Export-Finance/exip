/**
 * checkClassName
 * Check an elements class name
 * @param {Object} selector: Cypress selector
 * @param {String} expectedClassName: Expected class name
 */
const checkClassName = (selector, expectedClassName) => {
  selector.should('have.attr', 'class', expectedClassName);
};

export default checkClassName;
