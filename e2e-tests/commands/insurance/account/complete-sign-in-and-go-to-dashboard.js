import { ROUTES } from '../../../constants';

const {
  INSURANCE: { DASHBOARD },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

/**
 * completeSignInAndGoToDashboard
 * 1) Create an account directly via the API
 * 2) Verify the account via "verify email" page (mimicking clicking email link)
 * 3) Complete and submit the "account sign in" form
 * 4) Add a new OTP/security code and get it directly from the API
 * 5) Complete and submit the "enter security code" form
 * 6) Check we are on the dashbooard
 */
const completeSignInAndGoToDashboard = () => cy.createAccount({}).then(({ accountId, verifyAccountUrl }) => {
  // verify the account by navigating to the "verify account" page
  cy.navigateToUrl(verifyAccountUrl);

  // sign in to the account. Behind the scenes, an application is created at this point.
  cy.completeAndSubmitSignInAccountForm({});

  // get the OTP security code
  return cy.accountAddAndGetOTP().then((securityCode) => {
    // submit the OTP security code
    cy.completeAndSubmitEnterCodeAccountForm(securityCode);

    // assert we are on the dashboard
    const expectedUrl = `${baseUrl}${DASHBOARD}`;
    cy.assertUrl(expectedUrl);
  }).then(() => ({
    accountId,
  }));
});

export default completeSignInAndGoToDashboard;
