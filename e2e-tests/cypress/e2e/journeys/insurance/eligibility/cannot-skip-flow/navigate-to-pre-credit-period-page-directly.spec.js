import CONSTANTS from '../../../../../../constants';
const { ROUTES } = CONSTANTS;

context('Manually going to the `Pre-credit` page via URL without completing the previous forms', () => {
  beforeEach(() => {
    cy.visit(ROUTES.INSURANCE.ELIGIBILITY.PRE_CREDIT_PERIOD, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });
  });

  it('should redirect to the `need to start again` exit page', () => {
    cy.url().should('include', ROUTES.INSURANCE.ELIGIBILITY.NEED_TO_START_AGAIN);
  });
});
