import { ROUTES } from '../../../../../../constants';

const {
  QUOTE: { TYPE_OF_BUYER, NEED_TO_START_AGAIN_EXIT },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Manually going to the `Type of buyer` via URL page without completing the previous forms', () => {
  beforeEach(() => {
    cy.navigateToUrl(TYPE_OF_BUYER);
  });

  it('should redirect to the `need to start again` exit page', () => {
    const expectedUrl = `${baseUrl}${NEED_TO_START_AGAIN_EXIT}`;

    cy.assertUrl(expectedUrl);
  });
});
