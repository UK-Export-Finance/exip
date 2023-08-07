import { ROUTES } from '../../../../../../constants';

context('Manually going to the `Exporter location` page via URL without completing the previous forms', () => {
  beforeEach(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.ELIGIBILITY.EXPORTER_LOCATION);
  });

  it('should redirect to the `need to start again` exit page', () => {
    cy.assertUrl(ROUTES.INSURANCE.ELIGIBILITY.NEED_TO_START_AGAIN);
  });
});
