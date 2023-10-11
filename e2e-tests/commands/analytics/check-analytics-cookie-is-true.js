import checkAnalyticsCookieProperties from './check-analytics-cookie-properties';
import { COOKIE } from '../../constants';

const checkAnalyticsCookieIsTrue = () => {
  checkAnalyticsCookieProperties();

  cy.getCookie(COOKIE.NAME.OPTION).should('exist');
  cy.getCookie(COOKIE.NAME.OPTION).should('have.property', 'value', 'true');
};

export default checkAnalyticsCookieIsTrue;
