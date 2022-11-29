import { ROUTES } from '../../../../../../constants';

context('Manually going to the `Other parties` page via URL without completing the previous forms', () => {
  beforeEach(() => {
    cy.visit(ROUTES.INSURANCE.ELIGIBILITY.OTHER_PARTIES_INVOLVED, {
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
