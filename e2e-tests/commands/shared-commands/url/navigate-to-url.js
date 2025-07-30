/**
 * navigateToUrl
 * Navigate to a URL
 * @param {string} url
 * @returns {Window}
 */
const navigateToUrl = (url) => cy.visit(url);

export default navigateToUrl;
