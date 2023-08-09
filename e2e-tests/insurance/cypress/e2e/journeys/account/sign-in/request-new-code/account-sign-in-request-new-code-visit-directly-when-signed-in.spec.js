import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  ACCOUNT: {
    SIGN_IN: { REQUEST_NEW_CODE },
  },
  DASHBOARD,
} = ROUTES;

context("Insurance - Account - Visit the 'Request new code' page directly when already signed in", () => {
  const baseUrl = Cypress.config('baseUrl');
  const requestNewCodeUrl = `${baseUrl}${REQUEST_NEW_CODE}`;
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
    cy.navigateToUrl(requestNewCodeUrl);

    cy.assertUrl(dashboardUrl);
  });
});
