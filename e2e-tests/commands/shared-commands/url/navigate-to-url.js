/**
 * navigateToUrl
 * Navigate to a URL
 * @param {String} url
 * @returns {Window}
 */
const navigateToUrl = (url) => cy.visit(url);

export default navigateToUrl;
