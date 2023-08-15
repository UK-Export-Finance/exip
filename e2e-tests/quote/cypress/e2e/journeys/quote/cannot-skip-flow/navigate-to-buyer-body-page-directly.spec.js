import { ROUTES } from '../../../../../../constants';

const {
  QUOTE: {
    BUYER_BODY, NEED_TO_START_AGAIN,
  },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Manually going to the `Buyer body` via URL page without completing the previous forms', () => {
  beforeEach(() => {
    cy.navigateToUrl(BUYER_BODY);
  });

  it('should redirect to the `need to start again` exit page', () => {
    const expectedUrl = `${baseUrl}${NEED_TO_START_AGAIN}`;

    cy.assertUrl(expectedUrl);
  });
});
