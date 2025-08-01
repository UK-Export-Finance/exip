import { ROUTES } from '../../../constants';

const {
  INSURANCE: { DASHBOARD, ALL_SECTIONS, ROOT },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

/**
 * completeSignInAndOTP
 * 1) Complete and submit the "account sign in" form
 * 2) Add a new OTP/access code and get it directly from the API
 * 3) Complete and submit the "enter access code" form
 * 4) Check url - if on the dashboard or application all sections (if only one application, then should go directly to application)
 * @param {number} referenceNumber: Application reference number
 * @param {boolean} shouldRedirectToApplication: if should redirect to application or dashboard
 */
const completeSignInAndOTP = ({ referenceNumber, shouldRedirectToApplication = false }) => {
  // sign in to the account. Behind the scenes, an application is created at this point.
  cy.completeAndSubmitSignInAccountForm({});

  // get the OTP access code
  cy.accountAddAndGetOTP().then((accessCode) => {
    // submit the OTP access code
    cy.completeAndSubmitEnterCodeAccountForm(accessCode);

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
