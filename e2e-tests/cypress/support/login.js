const CONSTANTS = require('../../constants');

export default () => {
  cy.visit(CONSTANTS.ROUTES.ROOT, {
    auth: {
      username: Cypress.config('basicAuthKey'),
      password: Cypress.config('basicAuthSecret'),
    },
  });
};
