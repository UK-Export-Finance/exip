import { backLink } from '../../../../../pages/shared';
import { yourDetailsPage } from '../../../../../pages/insurance/account/create';
import { signInPage } from '../../../../../pages/insurance/account/sign-in';
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

  before(() => {
    cy.completeAndSubmitCreateAccountForm({ navigateToAccountCreationPage: true });

    // go back to create account page
    backLink().click();

    // navigate to sign in page
    yourDetailsPage.signInButtonLink().click();

    // navigate to password reset page
    signInPage.resetPasswordLink().click();

    cy.assertUrl(passwordResetUrl);
  });

  after(() => {
    cy.deleteAccount();
  });

  describe('when attempting password reset multiple times and reaching the maximum retries threshold', () => {
    beforeEach(() => {
      cy.saveSession();

      cy.navigateToUrl(passwordResetUrl);

      cy.completeAndSubmitPasswordResetFormMaximumRetries();
    });

    it(`should redirect to ${SUSPENDED_ROOT}`, () => {
      cy.assertUrl(accountSuspendedUrl);
    });
  });

  describe('when attempting password reset for an additional time after the threshold has been reached and the account is blocked', () => {
    before(() => {
      cy.saveSession();

      cy.navigateToUrl(passwordResetUrl);

      cy.completeAndSubmitPasswordResetForm({ assertRedirectUrl: false });
    });

    it(`should redirect to ${SUSPENDED_ROOT}`, () => {
      cy.assertUrl(accountSuspendedUrl);
    });
  });
});
