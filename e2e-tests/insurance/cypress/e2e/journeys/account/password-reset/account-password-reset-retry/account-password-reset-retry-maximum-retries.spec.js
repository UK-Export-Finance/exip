import { yourDetailsPage } from '../../../../../../../pages/insurance/account/create';
import { signInPage } from '../../../../../../../pages/insurance/account/sign-in';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  ACCOUNT: {
    PASSWORD_RESET: { ROOT: PASSWORD_RESET_ROOT },
    SUSPENDED: { ROOT: SUSPENDED_ROOT },
  },
} = ROUTES;

context('Insurance - Account - Password reset - Submitting the form successfully over the maximum threshold in the allowed time period should block the account', () => {
  const baseUrl = Cypress.config('baseUrl');
  const passwordResetUrl = `${baseUrl}${PASSWORD_RESET_ROOT}`;
  const accountSuspendedUrl = `${baseUrl}${SUSPENDED_ROOT}`;

  let account;

  before(() => {
    cy.deleteAccount();

    cy.completeAndSubmitCreateAccountForm({ navigateToAccountCreationPage: true });

    // go back to create account page
    cy.clickBackLink();

    // navigate to sign in page
    yourDetailsPage.signInButtonLink().click();

    // navigate to password reset page
    signInPage.resetPasswordLink().click();

    cy.assertUrl(passwordResetUrl);
  });

  describe('when attempting password reset multiple times and reaching the maximum retries threshold', () => {
    beforeEach(() => {
      cy.saveSession();

      cy.navigateToUrl(passwordResetUrl);

      cy.completeAndSubmitPasswordResetFormMaximumRetries();
    });

    it(`should redirect to ${SUSPENDED_ROOT} with ID query param`, () => {
      /**
       * Get the account ID directly from the API,
       * so that we can assert that the URL has the correct account ID.
       */
      const accountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');

      cy.getAccountByEmail(accountEmail).then((responseData) => {
        const [firstAccount] = responseData;
        account = firstAccount;

        const expectedUrl = `${accountSuspendedUrl}?id=${account.id}`;

        cy.assertUrl(expectedUrl);
      });
    });
  });

  describe('when attempting password reset for an additional time after the threshold has been reached and the account is blocked', () => {
    before(() => {
      cy.saveSession();

      cy.navigateToUrl(passwordResetUrl);

      cy.completeAndSubmitPasswordResetForm({ assertRedirectUrl: false });
    });

    it(`should redirect to ${SUSPENDED_ROOT} with ID query param`, () => {
      const expectedUrl = `${accountSuspendedUrl}?id=${account.id}`;

      cy.assertUrl(expectedUrl);
    });
  });
});
