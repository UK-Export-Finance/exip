import { ROUTES } from '../../../../../../constants';

context('Manually going to the `UK goods or services` page via URL without completing the previous forms', () => {
  beforeEach(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.ELIGIBILITY.UK_GOODS_OR_SERVICES);
  });

  it('should redirect to the `need to start again` exit page', () => {
    cy.url().should('include', ROUTES.INSURANCE.ELIGIBILITY.NEED_TO_START_AGAIN);
  });
});
