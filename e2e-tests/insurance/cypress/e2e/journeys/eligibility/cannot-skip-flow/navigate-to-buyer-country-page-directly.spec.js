import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ELIGIBILITY: {
    BUYER_COUNTRY, NEED_TO_START_AGAIN,
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Manually going to the `Buyer country` page via URL without completing the previous forms', () => {
  beforeEach(() => {
    cy.navigateToUrl(BUYER_COUNTRY);
  });

  it('should redirect to the `need to start again` exit page', () => {
    const expectedUrl = `${baseUrl}${NEED_TO_START_AGAIN}`;

    cy.assertUrl(expectedUrl);
  });
});
