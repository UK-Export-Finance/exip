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
    ACCOUNT: { SIGN_IN: { ROOT: SIGN_IN_ROOT } },
  },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

/**
 * signInAndGoToUrl
 * 1) Navigate to the sign in page/URL
 * 2) Complete and submit the "account sign in" form
 * 3) Add a new OTP/security code and get it directly from the API
 * 4) Complete and submit the "enter security code" form
 * 5) Go to the test page/URL (provided via param)
 * 6) Assert we are on the provided page/URL
 * @param {String} Page URL to go to after account sign in
 */
const signInAndGoToUrl = (url) => {
  cy.navigateToUrl(`${baseUrl}${SIGN_IN_ROOT}`);
  cy.completeAndSubmitSignInAccountForm({});

  // get the OTP security code
  cy.accountAddAndGetOTP().then((securityCode) => {
    cy.keyboardInput(enterCodePage[SECURITY_CODE].input(), securityCode);

    // submit the OTP security code
    submitButton().click();

    cy.navigateToUrl(url);
    cy.assertUrl(url);
  });
};

export default signInAndGoToUrl;
