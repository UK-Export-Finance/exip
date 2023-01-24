import { ROUTES } from '../../../../../constants';

context('Manually going to the `Tell us about your policy` page via URL without completing previous forms', () => {
  beforeEach(() => {
    cy.navigateToUrl(ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY);
  });

  it('should redirect to the `need to start again` exit page', () => {
    cy.url().should('include', ROUTES.QUOTE.NEED_TO_START_AGAIN);
  });
});

context('Manually going to the `Change Tell us about your policy` page via URL without completing previous forms', () => {
  beforeEach(() => {
    cy.navigateToUrl(ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE);
  });

  it('should redirect to the `need to start again` exit page', () => {
    cy.url().should('include', ROUTES.QUOTE.NEED_TO_START_AGAIN);
  });
});
