import { ROUTES } from '../../../../../constants';

const {
  DASHBOARD,
  ACCOUNT: { SIGN_IN },
} = ROUTES.INSURANCE;

context('Insurance - Dashboard - not signed in', () => {
  before(() => {
    const url = `${Cypress.config('baseUrl')}${DASHBOARD}`;

    // TODO: EMS-1268 - when the authenticated header has been built, update this to click on the dashboard link.
    cy.navigateToUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it(`should redirect to ${SIGN_IN.ROOT}`, () => {
    const expected = `${Cypress.config('baseUrl')}${SIGN_IN.ROOT}`;

    cy.url().should('eq', expected);
  });
});
