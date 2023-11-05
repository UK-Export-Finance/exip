import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  ACCOUNT: {
    SIGN_IN: { ENTER_CODE },
  },
  DASHBOARD,
} = ROUTES;

context("Insurance - Account - Visit the 'Enter code' page directly when already signed in", () => {
  const baseUrl = Cypress.config('baseUrl');
  const enterCodeUrl = `${baseUrl}${ENTER_CODE}`;
  const dashboardUrl = `${baseUrl}${DASHBOARD}`;

  before(() => {
    cy.completeSignInAndGoToDashboard();
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccount();
  });

  it(`should redirect to ${DASHBOARD}`, () => {
    cy.navigateToUrl(enterCodeUrl);

    cy.assertUrl(dashboardUrl);
  });
});
