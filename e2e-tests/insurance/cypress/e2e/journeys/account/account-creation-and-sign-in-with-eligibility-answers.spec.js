import dashboardPage from '../../../../../pages/insurance/dashboard';
import { ROUTES } from '../../../../../constants';
import header from '../../../../../partials/header';

const { table } = dashboardPage;

const {
  DASHBOARD,
  START,
  ALL_SECTIONS,
  ROOT,
  ACCOUNT: {
    SIGN_IN: { ENTER_CODE },
  },
} = ROUTES.INSURANCE;

context('Insurance - Account - When answering eligibility answers, creating an account and signing in - should create a new application', () => {
  let referenceNumber;

  const baseUrl = Cypress.config('baseUrl');
  const dashboardUrl = `${baseUrl}${DASHBOARD}`;
  const enterCodeUrl = `${baseUrl}${ENTER_CODE}`;

  before(() => {
    cy.deleteAccount();

    cy.navigateToUrl(START);

    cy.submitEligibilityAndStartAccountCreation();

    cy.completeAndSubmitCreateAccountForm();

    /**
     * Clear the session
     * So that we are mimicking starting a fresh session/browser instance,
     * when clicking the link in "verify account" email
     */
    cy.clearCookie('exip-session');

    cy.verifyAccountEmail();

    cy.completeAndSubmitSignInAccountForm({});
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('after signing in with a valid security code', () => {
    let validSecurityCode;

    before(() => {
      cy.navigateToUrl(enterCodeUrl);

      // create and get an OTP for the exporter's account
      cy.accountAddAndGetOTP().then((securityCode) => {
        validSecurityCode = securityCode;

        cy.completeAndSubmitEnterCodeAccountForm(validSecurityCode);
      });
    });

    it(`should redirect to ${dashboardUrl} and have one application in the table`, () => {
      cy.getReferenceNumber().then((refNumber) => {
        const expectedUrl = `${baseUrl}${ROOT}/${refNumber}${ALL_SECTIONS}`;
        cy.assertUrl(expectedUrl);
      });

      // go back to the dashboard
      header.navigation.applications().click();

      cy.assertUrl(dashboardUrl);

      table.body.rows().should('have.length', 1);

      table.body.firstRow.referenceNumberLink().invoke('text').then((refNumber) => {
        referenceNumber = refNumber;
      });
    });
  });
});
