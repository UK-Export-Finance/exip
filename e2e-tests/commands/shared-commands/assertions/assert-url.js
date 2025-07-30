/**
 * assertUrl
 * Assert a URL.
 * @param {string} Expected URL
 */
const assertUrl = (url) => {
  cy.url().should('eq', url);
};

export default assertUrl;
