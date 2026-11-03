import { COOKIE } from '../constants';

const cookies = [COOKIE.NAME.SESSION, COOKIE.NAME.CSRF];
const savedCookies = new Map();

const flags = {
  secure: true,
  httpOnly: true,
  path: '/',
  log: false,
};

/**
 * Saves cookies in memory for preservation between tests in a spec.
 * @returns {void}
 */
const saveSession = () => {
  // Iterate through the cookies array
  cookies.forEach((cookie) => {
    // Fetch Cypress cookie
    cy.getCookie(cookie).then((value) => {
      if (value) {
        // Cookie exists, save to memory
        savedCookies.set(cookie, value);
      } else {
        // Fetch value from memory
        const saved = savedCookies.get(cookie);

        if (saved?.value) {
          // Save Cypress cookie
          cy.setCookie(cookie, saved.value, flags);
        }
      }
    });
  });
};

export default saveSession;
