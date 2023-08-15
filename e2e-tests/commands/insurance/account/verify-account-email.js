import { INSURANCE_ROUTES as ROUTES } from '../../../constants/routes/insurance';

const {
  ACCOUNT: { CREATE: { VERIFY_EMAIL }, SIGN_IN },
} = ROUTES;

const accountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');

/**
 * verifyAccountEmail
 * Get the account (with verification hash) directly from the API,
 * Mimic "cliking email verification link" in an email inbox by manually navigating to the URL
 */
const verifyAccountEmail = () => {
  try {
    // get the account
    cy.getAccountByEmail(accountEmail).then((response) => {
      const { data } = response.body;

      const [firstAccount] = data.accounts;

      const { verificationHash } = firstAccount;

      // mimic clicking email verification link
      cy.navigateToUrl(`${Cypress.config('baseUrl')}${VERIFY_EMAIL}?token=${verificationHash}`);

      // User should be verified and therefore redirected to the "sign in" page.
      const expected = `${Cypress.config('baseUrl')}${SIGN_IN.ROOT}`;

      cy.assertUrl(expected);
    });
  } catch (err) {
    console.error(err);

    throw new Error('Verifying account email');
  }
};

export default verifyAccountEmail;
