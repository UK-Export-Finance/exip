import { INSURANCE_ROUTES as ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ACCOUNT: {
    SIGN_IN: { ROOT: SIGN_IN_ROOT },
    MANAGE,
  },
} = ROUTES;

context('Insurance - Account - Manage - visiting when not signed in', () => {
  const baseUrl = Cypress.config('baseUrl');
  const manageAccountUrl = `${baseUrl}${MANAGE}`;
  const signInUrl = `${baseUrl}${SIGN_IN_ROOT}`;

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(manageAccountUrl);
  });

  it(`should redirect to ${SIGN_IN_ROOT}`, () => {
    cy.assertUrl(signInUrl);
  });
});
