import checkAnalyticsCookieProperties from './check-analytics-cookie-properties';

const checkAnalyticsCookieIsTrue = () => {
  checkAnalyticsCookieProperties();

  cy.getCookie('optionalCookies').should('exist');
  cy.getCookie('optionalCookies').should('have.property', 'value', 'true');
};

export default checkAnalyticsCookieIsTrue;
