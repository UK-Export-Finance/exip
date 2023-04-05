import header from '../../../partials/header';
import { ROUTES } from '../../../../../constants';

const {
  ACCOUNT: { SIGN_IN },
} = ROUTES.INSURANCE;

context('Insurance - Dashboard - not signed in', () => {
  before(() => {
    header.navigation.applications().click();
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it(`should redirect to ${SIGN_IN.ROOT}`, () => {
    const expected = `${Cypress.config('baseUrl')}${SIGN_IN.ROOT}`;

    cy.url().should('eq', expected);
  });
});
