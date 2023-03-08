import { submitButton } from '../../../e2e/pages/shared';
import { enterCodePage } from '../../../e2e/pages/insurance/account/sign-in';
import insurancePages from '../../../e2e/pages/insurance';
import { FIELD_IDS, ROUTES } from '../../../../constants';

const {
  INSURANCE: {
    ACCOUNT: { SECURITY_CODE },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    START,
    DASHBOARD,
  },
} = ROUTES;

/**
 * completeSignInAndGoToApplication
 * 1) Complete "insurance eligibility"
 * 3) Create an account directly via the API
 * 4) Verify the account via "verify email" page (mimicking clicking email link)
 * 5) Complete and submit the "account sign in" form
 * 6) Add a new OTP/security code and get it directly from the API
 * 7) Complete and submit the "enter security code" form
 * 8) Check we are on the dashbooard
 * 9) Click on the application link in the dashboard
 * 10) Get and return the application reference number from the URL for consumption in the tests
 * @return {String} Application reference number
 */
const completeSignInAndGoToApplication = () => {
  // complete insurance eligibility forms/flow
  cy.navigateToUrl(START);
  cy.submitInsuranceEligibilityAnswersHappyPath();

  // create an exporter account
  return cy.createAccount().then((verifyAccountUrl) => {
    // verify the account by navigating to the "verify account" page
    cy.navigateToUrl(verifyAccountUrl);

    // sign in to the account. Behind the scenes, an application is created at this point.
    cy.completeAndSubmitSignInAccountForm();

    // get the OTP security code
    cy.accountAddAndGetOTP().then((securityCode) => {
      cy.keyboardInput(enterCodePage[SECURITY_CODE].input(), securityCode);

      // submit the OTP security code
      submitButton().click();

      // assert we are on the dashboard
      const expectedUrl = `${Cypress.config('baseUrl')}${DASHBOARD}`;
      cy.url().should('eq', expectedUrl);

      // go to the newly created application
      insurancePages.dashboardPage.listItem().last().click();

      // get the reference number and return for consumption in the test
      cy.getReferenceNumber().then((referenceNumber) => referenceNumber);
    });
  });
};

export default completeSignInAndGoToApplication;
