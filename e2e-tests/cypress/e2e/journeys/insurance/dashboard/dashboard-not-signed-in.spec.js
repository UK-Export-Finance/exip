import { ROUTES } from '../../../../../constants';

const {
  ACCOUNT: { SIGN_IN },
  DASHBOARD,
} = ROUTES.INSURANCE;

context('Insurance - Dashboard - not signed in', () => {
  beforeEach(() => {
    cy.saveSession();

    const url = `${Cypress.config('baseUrl')}${DASHBOARD}`;

    cy.navigateToUrl(url);
  });

  it(`should redirect to ${SIGN_IN.ROOT}`, () => {
    const expected = `${Cypress.config('baseUrl')}${SIGN_IN.ROOT}`;

    cy.url().should('eq', expected);
  });
});
