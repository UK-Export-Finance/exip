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

context('Insurance - Account - Sign in - Submitting the form with invalid credentials multiple times should suspend the account', () => {
  const baseUrl = Cypress.config('baseUrl');
  const signInUrl = `${baseUrl}${SIGN_IN_ROOT}`;
  const accountSuspendedUrl = `${baseUrl}${SUSPENDED_ROOT}`;

  let account;

  const invalidPassword = `${mockAccount[PASSWORD]}-invalid`;

  before(() => {
    cy.deleteAccount();

    cy.completeAndSubmitCreateAccountForm({ navigateToAccountCreationPage: true });

    cy.verifyAccountEmail();

    cy.assertUrl(signInUrl);
  });

  describe('when attempting sign in with invalid credentials multiple times and reaching the maximum retries threshold', () => {
    beforeEach(() => {
      cy.saveSession();

      cy.navigateToUrl(signInUrl);

      cy.completeAndSubmitSignInAccountFormMaximumInvalidRetries({
        password: invalidPassword,
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

  describe('when attempting sign in for an additional time after the threshold has been reached and the account is blocked', () => {
    before(() => {
      cy.saveSession();

      cy.navigateToUrl(signInUrl);

      cy.completeAndSubmitSignInAccountForm({ assertRedirectUrl: false });
    });

    it(`should redirect to ${SUSPENDED_ROOT} with ID query param`, () => {
      const expectedUrl = `${accountSuspendedUrl}?id=${account.id}`;

      cy.assertUrl(expectedUrl);
    });
  });
});
