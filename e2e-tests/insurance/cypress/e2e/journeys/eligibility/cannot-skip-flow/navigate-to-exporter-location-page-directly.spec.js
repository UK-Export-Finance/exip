import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ELIGIBILITY: {
    EXPORTER_LOCATION, NEED_TO_START_AGAIN,
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Manually going to the `Exporter location` page via URL without completing the previous forms', () => {
  beforeEach(() => {
    cy.navigateToUrl(EXPORTER_LOCATION);
  });

  it('should redirect to the `need to start again` exit page', () => {
    const expectedUrl = `${baseUrl}${NEED_TO_START_AGAIN}`;

    cy.assertUrl(expectedUrl);
  });
});
