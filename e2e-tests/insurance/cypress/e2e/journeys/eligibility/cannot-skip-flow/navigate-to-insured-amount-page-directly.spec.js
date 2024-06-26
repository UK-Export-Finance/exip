import { ROUTES } from '../../../../../../constants';

const {
  INSURANCE: {
    ELIGIBILITY: { INSURED_AMOUNT, NEED_TO_START_AGAIN },
  },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Manually going to the `Insured amount` page via URL without completing the previous forms', () => {
  beforeEach(() => {
    cy.navigateToUrl(INSURED_AMOUNT);
  });

  it('should redirect to the `need to start again` exit page', () => {
    const expectedUrl = `${baseUrl}${NEED_TO_START_AGAIN}`;

    cy.assertUrl(expectedUrl);
  });
});
