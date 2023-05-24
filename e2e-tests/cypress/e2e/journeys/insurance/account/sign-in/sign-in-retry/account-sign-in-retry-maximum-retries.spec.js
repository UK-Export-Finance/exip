import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  ACCOUNT: {
    SIGN_IN: { ROOT: SIGN_IN_ROOT },
    SUSPENDED: { ROOT: SUSPENDED_ROOT },
  },
} = ROUTES;

context('Insurance - Account - Sign in - Submitting the form with invalid credentials over the maximum threshold in the allowed time period should block the account', () => {
  const baseUrl = Cypress.config('baseUrl');
  const signInUrl = `${baseUrl}${SIGN_IN_ROOT}`;
  const accountSuspendedUrl = `${baseUrl}${SUSPENDED_ROOT}`;

  before(() => {
    cy.deleteAccount();

    cy.completeAndSubmitCreateAccountForm({ navigateToAccountCreationPage: true });

    cy.verifyAccountEmail();

    cy.assertUrl(signInUrl);
  });

  describe('when attempting sign in multiple times and reaching the maximum retries threshold', () => {
    beforeEach(() => {
      cy.saveSession();

      cy.navigateToUrl(signInUrl);

      cy.completeAndSubmitSignInAccountFormMaximumRetries();
    });

    it(`should redirect to ${SUSPENDED_ROOT}`, () => {
      cy.assertUrl(accountSuspendedUrl);
    });
  });

  describe('when attempting sign in for an additional time after the threshold has been reached and the account is blocked', () => {
    before(() => {
      cy.saveSession();

      cy.navigateToUrl(signInUrl);

      cy.completeAndSubmitSignInAccountForm({ assertRedirectUrl: false });
    });

    it(`should redirect to ${SUSPENDED_ROOT}`, () => {
      cy.assertUrl(accountSuspendedUrl);
    });
  });
});
