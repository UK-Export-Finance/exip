import { ROUTES } from '../../../../../../constants';

const {
  INSURANCE: {
    ELIGIBILITY: { COVER_PERIOD, NEED_TO_START_AGAIN },
  },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Manually going to the `Cover period` page via URL without completing the previous forms', () => {
  beforeEach(() => {
    cy.navigateToUrl(COVER_PERIOD);
  });

  it('should redirect to the `need to start again` exit page', () => {
    const expectedUrl = `${baseUrl}${NEED_TO_START_AGAIN}`;

    cy.assertUrl(expectedUrl);
  });
});
