import { COOKIE } from '../constants';

/**
 * Since cookies are cleared before individual tests execution.
 * Preserving the cookie, eliminates repeated logins.
 * Thus reduces execution time.
 */
const saveSession = () => cy.preserveCookieOnce(
  COOKIE.NAME.SESSION, // Session cookie
  COOKIE.NAME.CSRF, // CSRF cookie
);

export default saveSession;
