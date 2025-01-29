import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ELIGIBILITY: { COMPANY_DETAILS, NEED_TO_START_AGAIN_EXIT },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Manually going to the `Company details` page via URL without completing the previous forms', () => {
  beforeEach(() => {
    cy.navigateToUrl(COMPANY_DETAILS);
  });

  it('should redirect to the `need to start again` exit page', () => {
    const expectedUrl = `${baseUrl}${NEED_TO_START_AGAIN_EXIT}`;

    cy.assertUrl(expectedUrl);
  });
});
