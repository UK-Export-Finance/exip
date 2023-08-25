/**
 * Since cookies are cleared before individual tests execution.
 * Preserving the cookie, eliminates repeated logins.
 * Thus reduces execution time.
 */
const saveSession = () => cy.preserveCookieOnce(
  'exip-session', // Session cookie
  '_csrf', // CSRF cookie
);

export default saveSession;
