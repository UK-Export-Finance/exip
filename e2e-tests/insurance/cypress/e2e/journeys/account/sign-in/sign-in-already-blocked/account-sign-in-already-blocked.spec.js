import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import api from '../../../../../../../commands/api';

const {
  ACCOUNT: {
    SIGN_IN: { ROOT: SIGN_IN_ROOT },
    SUSPENDED: { ROOT: SUSPENDED_ROOT },
  },
} = ROUTES;

context('Insurance - Account - Sign in - Submitting the form when already blocked', () => {
  const baseUrl = Cypress.config('baseUrl');
  const signInUrl = `${baseUrl}${SIGN_IN_ROOT}`;
  const accountSuspendedUrl = `${baseUrl}${SUSPENDED_ROOT}`;

  let account;

  before(() => {
    cy.deleteAccount();

    cy.completeAndSubmitCreateAccountForm({ navigateToAccountCreationPage: true });

    cy.verifyAccountEmail();

    cy.assertUrl(signInUrl);
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(signInUrl);

    // force the account to be blocked
    cy.completeAndSubmitSignInAccountFormMaximumInvalidRetries({});

    cy.navigateToUrl(signInUrl);

    cy.completeAndSubmitSignInAccountForm({
      assertRedirectUrl: false,
    });
  });

  it(`should redirect to ${SUSPENDED_ROOT} with ID query param`, () => {
    /**
     * Get the account ID directly from the API,
     * so that we can assert that the URL has the correct account ID.
     */
    const accountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');

    api.getAccountByEmail(accountEmail).then((response) => {
      const { data } = response.body;

      const [firstAccount] = data.accounts;
      account = firstAccount;

      const expectedUrl = `${accountSuspendedUrl}?id=${account.id}`;

      cy.assertUrl(expectedUrl);
    });
  });
});
