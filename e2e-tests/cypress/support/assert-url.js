/**
 * assertUrl
 * @param {String} Expected URL
 */
const assertUrl = (url) => {
  cy.assertUrl(url);
};

export default assertUrl;
