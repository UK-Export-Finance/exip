import { ROUTES } from '../../../../../../constants';

const {
  INSURANCE: {
    ELIGIBILITY: { TOTAL_VALUE_INSURED, NEED_TO_START_AGAIN },
  },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Manually going to the `total value insured` page via URL without completing the previous forms', () => {
  beforeEach(() => {
    cy.navigateToUrl(TOTAL_VALUE_INSURED);
  });

  it('should redirect to the `need to start again` exit page', () => {
    const expectedUrl = `${baseUrl}${NEED_TO_START_AGAIN}`;

    cy.assertUrl(expectedUrl);
  });
});
