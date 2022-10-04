const checkAnalyticsCookieIsTrue = () => {
  cy.getCookie('optionalCookies').should('exist');
  cy.getCookie('optionalCookies').should('have.property', 'value', 'true');
};

export default checkAnalyticsCookieIsTrue;
