import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';

const { START } = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');
const startUrl = `${baseUrl}${START}`;

/**
 * completeInsuranceEligibilitySignInAndGoToDashboard
 * 1) Complete "insurance eligibility"
 * 3) Create an account directly via the API
 * 4) Verify the account via "verify email" page (mimicking clicking email link)
 * 5) Complete and submit the "account sign in" form
 * 6) Add a new OTP/access code and get it directly from the API
 * 7) Complete and submit the "enter access code" form
 * 8) Check we are on the "all sections" application page.
 * @param {String} emailAddress: Account email address
 * @param {String} companyNumber: Company number/Companies house number
 */
const completeInsuranceEligibilitySignInAndGoToDashboard = ({ emailAddress, companyNumber }) => {
  cy.navigateToUrl(startUrl);

  cy.submitInsuranceEligibilityAnswersHappyPath(companyNumber);

  // create an account
  return cy.createAccount({ emailAddress }).then(({ accountId, verifyAccountUrl }) => {
    // verify the account by navigating to the "verify account" page
    cy.navigateToUrl(verifyAccountUrl);

    /**
     * Sign in to the account.
     * Check we are on the "all sections" application page.
     */
    cy.signInAndAssertAllSectionsUrl({ accountId, emailAddress, verifyAccountUrl });
  });
};

export default completeInsuranceEligibilitySignInAndGoToDashboard;
