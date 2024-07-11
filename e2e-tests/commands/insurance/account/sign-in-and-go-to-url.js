import { field } from '../../../pages/shared';
import { FIELD_IDS, ROUTES } from '../../../constants';

const {
  INSURANCE: {
    ACCOUNT: { ACCESS_CODE },
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
 * 3) Add a new OTP/access code and get it directly from the API
 * 4) Complete and submit the "enter access code" form
 * 5) Go to the test page/URL (provided via param)
 * 6) Assert we are on the provided page/URL
 * @param {String} Page URL to go to after account sign in
 */
const signInAndGoToUrl = (url) => {
  cy.navigateToUrl(`${baseUrl}${SIGN_IN_ROOT}`);
  cy.completeAndSubmitSignInAccountForm({});

  // get the OTP access code
  cy.accountAddAndGetOTP().then((accessCode) => {
    cy.keyboardInput(field(ACCESS_CODE).input(), accessCode);

    // submit the OTP access code
    cy.clickSubmitButton();

    cy.navigateToUrl(url);
    cy.assertUrl(url);
  });
};

export default signInAndGoToUrl;
