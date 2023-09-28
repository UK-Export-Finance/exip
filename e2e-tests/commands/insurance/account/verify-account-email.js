import { INSURANCE_ROUTES as ROUTES } from '../../../constants/routes/insurance';

const {
  ACCOUNT: { CREATE: { VERIFY_EMAIL }, SIGN_IN },
} = ROUTES;

const accountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');

const baseUrl = Cypress.config('baseUrl');

/**
 * verifyAccountEmail
 * Get the account (with verification hash) directly from the API,
 * Mimic "cliking email verification link" in an email inbox by manually navigating to the URL
 */
const verifyAccountEmail = () => {
  // get the account
  cy.getAccountByEmail(accountEmail).then((responseData) => {
    const [firstAccount] = responseData;

    const { verificationHash } = firstAccount;

    // mimic clicking email verification link
    cy.navigateToUrl(`${baseUrl}${VERIFY_EMAIL}?token=${verificationHash}`);

    // User should be verified and therefore redirected to the "sign in" page.
    const expectedUrl = `${baseUrl}${SIGN_IN.ROOT}`;

    cy.assertUrl(expectedUrl);
  });
};

export default verifyAccountEmail;
