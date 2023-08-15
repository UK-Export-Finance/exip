import { ROUTES } from '../../../../../../constants';

const {
  QUOTE: {
    CHECK_YOUR_ANSWERS, NEED_TO_START_AGAIN,
  },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Manually going to the `Check your answers` via URL page without completing the previous forms', () => {
  beforeEach(() => {
    cy.navigateToUrl(CHECK_YOUR_ANSWERS);
  });

  it('should redirect to the `need to start again` exit page', () => {
    const expectedUrl = `${baseUrl}${NEED_TO_START_AGAIN}`;

    cy.assertUrl(expectedUrl);
  });
});
