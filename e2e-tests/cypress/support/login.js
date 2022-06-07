const CONSTANTS = require('../../constants');

export default () => {
  cy.visit(CONSTANTS.ROUTES.BEFORE_YOU_START, {
    auth: {
      username: Cypress.config('basicAuthKey'),
      password: Cypress.config('basicAuthSecret'),
    },
  });
};
