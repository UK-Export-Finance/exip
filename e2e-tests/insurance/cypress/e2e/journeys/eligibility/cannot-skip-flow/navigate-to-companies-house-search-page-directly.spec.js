import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ELIGIBILITY: { COMPANIES_HOUSE_NUMBER, NEED_TO_START_AGAIN_EXIT },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Manually going to the `Companies House number` page via URL without completing the previous forms', () => {
  beforeEach(() => {
    cy.navigateToUrl(COMPANIES_HOUSE_NUMBER);
  });

  it('should redirect to the `need to start again` exit page', () => {
    const expectedUrl = `${baseUrl}${NEED_TO_START_AGAIN_EXIT}`;

    cy.assertUrl(expectedUrl);
  });
});
