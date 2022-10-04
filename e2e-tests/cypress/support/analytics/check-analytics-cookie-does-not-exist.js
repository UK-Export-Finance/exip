const checkAnalyticsCookieDoesNotExist = () => {
  cy.getCookie('optionalCookies').should('not.exist');
};

export default checkAnalyticsCookieDoesNotExist;
