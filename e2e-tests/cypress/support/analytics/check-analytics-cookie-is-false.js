import checkAnalyticsCookieProperties from './check-analytics-cookie-properties';

// TODO, rename

const checkAnalyticsCookieIsFalse = () => {
  cy.getCookie('optionalCookies').should('exist');

  checkAnalyticsCookieProperties();

  cy.getCookie('optionalCookies').should('have.property', 'value', 'false');
};

export default checkAnalyticsCookieIsFalse;
