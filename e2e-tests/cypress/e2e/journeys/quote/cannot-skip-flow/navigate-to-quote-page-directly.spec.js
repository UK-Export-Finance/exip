import CONSTANTS from '../../../../../constants';
const { ROUTES } = CONSTANTS;

context('Manually going to the `Your quote` page via URL without completing the previous forms', () => {
  beforeEach(() => {
    cy.visit(ROUTES.QUOTE.YOUR_QUOTE, {
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
