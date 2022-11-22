import { ROUTES } from '../../constants';

export default () => {
  cy.visit(ROUTES.ROOT, {
    auth: {
      username: Cypress.config('basicAuthKey'),
      password: Cypress.config('basicAuthSecret'),
    },
  });
};
