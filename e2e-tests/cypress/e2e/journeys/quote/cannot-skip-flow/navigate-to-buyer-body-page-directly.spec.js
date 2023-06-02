import { ROUTES } from '../../../../../constants';

context('Manually going to the `Buyer body` via URL page without completing the previous forms', () => {
  beforeEach(() => {
    cy.navigateToUrl(ROUTES.QUOTE.BUYER_BODY);
  });

  it('should redirect to the `need to start again` exit page', () => {
    cy.url().should('include', ROUTES.QUOTE.NEED_TO_START_AGAIN);
  });
});
