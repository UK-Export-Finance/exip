import checkAnalyticsCookieProperties from './check-analytics-cookie-properties';
import { COOKIE } from '../../constants';

const checkAnalyticsCookieIsFalse = () => {
  cy.getCookie(COOKIE.NAME.OPTION).should('exist');

  checkAnalyticsCookieProperties();

  cy.getCookie(COOKIE.NAME.OPTION).should('have.property', 'value', 'false');
};

export default checkAnalyticsCookieIsFalse;
