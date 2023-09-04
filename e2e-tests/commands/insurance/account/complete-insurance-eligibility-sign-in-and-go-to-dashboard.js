import { submitButton } from '../../../pages/shared';
import { enterCodePage } from '../../../pages/insurance/account/sign-in';
import { FIELD_IDS, ROUTES } from '../../../constants';

const {
  INSURANCE: {
    ACCOUNT: { SECURITY_CODE },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    START,
    ALL_SECTIONS,
    ROOT,
  },
} = ROUTES;

/**
 * completeInsuranceEligibilitySignInAndGoToDashboard
 * 1) Complete "insurance eligibility"
 * 3) Create an account directly via the API
 * 4) Verify the account via "verify email" page (mimicking clicking email link)
 * 5) Complete and submit the "account sign in" form
 * 6) Add a new OTP/security code and get it directly from the API
 * 7) Complete and submit the "enter security code" form
 * 8) Check we are on the application
 * @param {String} Account email address
 */
const completeInsuranceEligibilitySignInAndGoToDashboard = (emailAddress) => {
  // complete insurance eligibility forms/flow
  cy.navigateToUrl(START);

  cy.submitInsuranceEligibilityAnswersHappyPath();

  // create an account
  return cy.createAccount({ emailAddress }).then(({ accountId, verifyAccountUrl }) => {
    // verify the account by navigating to the "verify account" page
    cy.navigateToUrl(verifyAccountUrl);

    // sign in to the account. Behind the scenes, an application is created at this point.
    cy.completeAndSubmitSignInAccountForm({ emailAddress });

    // get the OTP security code
    cy.accountAddAndGetOTP(emailAddress).then((securityCode) => {
      cy.keyboardInput(enterCodePage[SECURITY_CODE].input(), securityCode);

      // submit the OTP security code
      submitButton().click();

      cy.getReferenceNumber().then((referenceNumber) => {
        const expectedUrl = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;
        cy.assertUrl(expectedUrl);
      });
    }).then(() => ({
      accountId, verifyAccountUrl,
    }));
  });
};

export default completeInsuranceEligibilitySignInAndGoToDashboard;
