import { ROUTES } from '../../../../../../constants';

const {
  QUOTE: {
    YOUR_QUOTE, NEED_TO_START_AGAIN,
  },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Manually going to the `Your quote` page via URL without completing the previous forms', () => {
  beforeEach(() => {
    cy.navigateToUrl(YOUR_QUOTE);
  });

  it('should redirect to the `need to start again` exit page', () => {
    const expectedUrl = `${baseUrl}${NEED_TO_START_AGAIN}`;
    cy.assertUrl(expectedUrl);
  });
});
