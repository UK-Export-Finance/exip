import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';

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

  before(() => {
    cy.deleteAccount();

    cy.completeAndSubmitCreateAccountForm({ navigateToAccountCreationPage: true });

    cy.verifyAccountEmail();

    cy.assertUrl(signInUrl);

    // force the account to be blocked
    cy.completeAndSubmitSignInAccountFormMaximumRetries();
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(signInUrl);

    cy.completeAndSubmitSignInAccountForm({ assertRedirectUrl: false });
  });

  it(`should redirect to ${SUSPENDED_ROOT}`, () => {
    cy.assertUrl(accountSuspendedUrl);
  });
});
