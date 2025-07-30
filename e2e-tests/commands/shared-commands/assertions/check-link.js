/**
 * checkLink
 * Check an link's HREF and text
 * @param {Function} selector: Cypress selector
 * @param {string} expectedHref: Expected HREF
 * @param {string} expectedText: Expected text
 */
const checkLink = (selector, expectedHref, expectedText) => {
  selector.should('have.attr', 'href', expectedHref);

  cy.checkText(selector, expectedText);
};

export default checkLink;
