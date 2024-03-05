/**
 * checkClassName
 * Check an elements class name
 * @param {Function} selector: Cypress selector
 * @param {String} expectedClassName: Expected class name
 */
const checkClassName = (selector, expectedClassName) => {
  selector.input().should('have.value', expectedClassName);
};

export default checkClassName;
