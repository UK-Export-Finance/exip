import { ROUTES } from '../../../../../constants';

context('Manually going to the `Policy type` page via URL without completing the previous forms', () => {
  beforeEach(() => {
    cy.navigateToUrl(ROUTES.QUOTE.POLICY_TYPE);
  });

  it('should redirect to the `need to start again` exit page', () => {
    cy.assertUrl(ROUTES.QUOTE.NEED_TO_START_AGAIN);
  });
});

context('Manually going to the `Change Policy type` page via URL without completing the previous forms', () => {
  beforeEach(() => {
    cy.navigateToUrl(ROUTES.QUOTE.POLICY_TYPE_CHANGE);
  });

  it('should redirect to the `need to start again` exit page', () => {
    cy.assertUrl(ROUTES.QUOTE.NEED_TO_START_AGAIN);
  });
});
