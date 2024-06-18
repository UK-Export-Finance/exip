/**
 * assertUrl
 * Assert a URL.
 * @param {String} Expected URL
 */
const assertUrl = (url) => {
  cy.url().should('eq', url);
};

export default assertUrl;
