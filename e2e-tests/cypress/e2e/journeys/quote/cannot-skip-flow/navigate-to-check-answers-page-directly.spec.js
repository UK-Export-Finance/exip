import { ROUTES } from '../../../../../constants';

context('Manually going to the `Check your answers` via URL page without completing the previous forms', () => {
  beforeEach(() => {
    cy.navigateToUrl(ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
  });

  it('should redirect to the `need to start again` exit page', () => {
    cy.url().should('include', ROUTES.QUOTE.NEED_TO_START_AGAIN);
  });
});
