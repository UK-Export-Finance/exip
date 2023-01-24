import { ROUTES } from '../../../../../../constants';

context('Manually going to the `Insured amount` page via URL without completing the previous forms', () => {
  beforeEach(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.ELIGIBILITY.INSURED_AMOUNT);
  });

  it('should redirect to the `need to start again` exit page', () => {
    cy.url().should('include', ROUTES.INSURANCE.ELIGIBILITY.NEED_TO_START_AGAIN);
  });
});
