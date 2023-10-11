import { COOKIE } from '../../constants';

const checkAnalyticsCookieDoesNotExist = () => {
  cy.getCookie(COOKIE.NAME.OPTION).should('not.exist');
};

export default checkAnalyticsCookieDoesNotExist;
