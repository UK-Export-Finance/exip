import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import mockAccount from '../../../../../../../fixtures/account';
import api from '../../../../../../../commands/api';

const {
  ACCOUNT: {
    SIGN_IN: { ROOT: SIGN_IN_ROOT },
    SUSPENDED: { ROOT: SUSPENDED_ROOT },
  },
} = ROUTES;

const { ACCOUNT: { PASSWORD } } = INSURANCE_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

const invalidPassword = `${mockAccount[PASSWORD]}-invalid`;

context('Insurance - Account - Sign in - Submitting the form when already blocked', () => {
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
    cy.completeAndSubmitSignInAccountFormMaximumInvalidRetries({
      password: invalidPassword,
    });
  });

  describe('when attempting to sign in with an account that has been blocked', () => {
    beforeEach(async () => {
      /**
       * Get the account ID directly from the API,
       * so that we can assert that the URL has the correct account ID.
       */
      const accountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');

      const accountsResponse = await api.getAccountByEmail(accountEmail);

      const [firstAccount] = accountsResponse;
      account = firstAccount;
    });

    it(`should redirect to ${SUSPENDED_ROOT} with ID query param`, () => {
      /**
       * 1) Go to the sign in page.
       * 2) Attempt to sign in again.
       * 3) Check a user is redirected to the suspended page.
       */
      cy.navigateToUrl(signInUrl);

      cy.completeAndSubmitSignInAccountForm({
        assertRedirectUrl: false,
      });

      const expectedUrl = `${accountSuspendedUrl}?id=${account.id}`;

      cy.assertUrl(expectedUrl);
    });
  });
});
