import { ROUTES } from '../../../constants';

const {
  INSURANCE: { DASHBOARD, ALL_SECTIONS, ROOT },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

/**
 * completeSignInAndOTP
 * 1) Complete and submit the "account sign in" form
 * 2) Add a new OTP/security code and get it directly from the API
 * 3) Complete and submit the "enter security code" form
 * 4) Check url - if on the dashboard or application all sections (if only one application, then should go directly to application)
 * @param {Number} referenceNumber: Application reference number
 * @param {Boolean} shouldRedirectToApplication: if should redirect to application or dashboard
 */
const completeSignInAndOTP = ({ referenceNumber, shouldRedirectToApplication = false }) => {
  // sign in to the account. Behind the scenes, an application is created at this point.
  cy.completeAndSubmitSignInAccountForm({});

  // get the OTP security code
  cy.accountAddAndGetOTP().then((securityCode) => {
    // submit the OTP security code
    cy.completeAndSubmitEnterCodeAccountForm(securityCode);

    let expectedUrl;

    if (shouldRedirectToApplication) {
      // URL for application if redirecting to application if only 1 application for user
      expectedUrl = `${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;
    } else {
      // dashboard URL
      expectedUrl = `${baseUrl}${DASHBOARD}`;
    }

    cy.assertUrl(expectedUrl);
  });
};

export default completeSignInAndOTP;
