import { ROUTES } from '../../../../../constants';

context('Manually going to the `UK goods or services` page via URL without completing the previous forms', () => {
  beforeEach(() => {
    cy.navigateToUrl(ROUTES.QUOTE.UK_GOODS_OR_SERVICES);
  });

  it('should redirect to the `need to start again` exit page', () => {
    cy.assertUrl(ROUTES.QUOTE.NEED_TO_START_AGAIN);
  });
});

context('Manually going to the `Change UK goods or services` page via URL without completing the previous forms', () => {
  beforeEach(() => {
    cy.navigateToUrl(ROUTES.QUOTE.UK_GOODS_OR_SERVICES_CHANGE);
  });

  it('should redirect to the `need to start again` exit page', () => {
    cy.assertUrl(ROUTES.QUOTE.NEED_TO_START_AGAIN);
  });
});
