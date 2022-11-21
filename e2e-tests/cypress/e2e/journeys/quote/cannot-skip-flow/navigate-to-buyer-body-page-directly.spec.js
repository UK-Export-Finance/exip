import { ROUTES } from '../../../../../constants';

context('Manually going to the `Buyer body` via URL page without completing the previous forms', () => {
  beforeEach(() => {
    cy.visit(ROUTES.QUOTE.BUYER_BODY, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });
  });

  it('should redirect to the `need to start again` exit page', () => {
    cy.url().should('include', ROUTES.QUOTE.NEED_TO_START_AGAIN);
  });
});
