import { ROUTES } from '../../../../../constants';

const {
  ACCOUNT: { SIGN_IN },
  DASHBOARD,
} = ROUTES.INSURANCE;

context('Insurance - Dashboard - not signed in', () => {
  const baseUrl = Cypress.config('baseUrl');

  beforeEach(() => {
    cy.saveSession();

    const url = `${baseUrl}${DASHBOARD}`;

    cy.navigateToUrl(url);
  });

  it(`should redirect to ${SIGN_IN.ROOT}`, () => {
    const expected = `${baseUrl}${SIGN_IN.ROOT}`;

    cy.assertUrl(expected);
  });
});
