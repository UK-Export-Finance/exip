import CONSTANTS from '../../../../../constants';
const { ROUTES } = CONSTANTS;

context('Manually going to the `Policy type` page via URL without completing the previous forms', () => {
  beforeEach(() => {
    cy.visit(ROUTES.QUOTE.POLICY_TYPE, {
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

context('Manually going to the `Change Policy type` page via URL without completing the previous forms', () => {
  beforeEach(() => {
    cy.visit(ROUTES.QUOTE.POLICY_TYPE_CHANGE, {
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
