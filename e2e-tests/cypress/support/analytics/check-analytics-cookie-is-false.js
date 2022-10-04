const checkAnalyticsCookieIsFalse = () => {
  cy.getCookie('optionalCookies').should('exist');
  cy.getCookie('optionalCookies').should('have.property', 'value', 'false');
};

export default checkAnalyticsCookieIsFalse;
