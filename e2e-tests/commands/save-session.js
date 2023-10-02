import { COOKIE } from '../constants';

const cookies = [
  COOKIE.NAME.SESSION,
  COOKIE.NAME.CSRF,
];

const flags = {
  secure: true,
  httpOnly: true,
  path: '/',
  log: false,
};

const saveSession = () => {
  // Iterate through the cookies array
  cookies.forEach((cookie) => {
    // Cypress cookie name
    const cypressCookie = `cookie_${cookie}`;

    // Fetch Cypress cookie
    cy.getCookie(cypressCookie)
      .then((value) => {
        if (value) {
          // Cookie exists, save to the environment
          Cypress.env(cypressCookie, value);
        } else {
          // Fetch value from the environment
          const saved = Cypress.env(cypressCookie);

          if (saved?.value) {
            // Save Cypress cookie
            cy.setCookie(cookie, saved.value, flags);
          }
        }
      });
  });
};

export default saveSession;
