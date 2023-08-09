import { ROUTES } from '../../../../../../constants';

context('Manually going to the `Your quote` page via URL without completing the previous forms', () => {
  beforeEach(() => {
    cy.navigateToUrl(ROUTES.QUOTE.YOUR_QUOTE);
  });

  it('should redirect to the `need to start again` exit page', () => {
    cy.url().should('include', ROUTES.QUOTE.NEED_TO_START_AGAIN);
  });
});
