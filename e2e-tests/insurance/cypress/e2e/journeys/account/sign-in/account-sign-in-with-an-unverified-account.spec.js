import { yourDetailsPage } from '../../../../../../pages/insurance/account/create';
import { ACCOUNT as ROUTES } from '../../../../../../constants/routes/insurance/account';

const {
  SIGN_IN: { ROOT: SIGN_IN_ROOT },
  CREATE: { YOUR_DETAILS, CONFIRM_EMAIL_RESENT },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Account - Sign in - unverified account', () => {
  const signInUrl = `${baseUrl}${SIGN_IN_ROOT}`;
  const yourDetailsUrl = `${baseUrl}${YOUR_DETAILS}`;
  const confirmEmailResentUrl = `${baseUrl}${CONFIRM_EMAIL_RESENT}`;
  let account;

  before(() => {
    cy.deleteAccount();

    cy.navigateToUrl(yourDetailsUrl);

    /**
     * create an account,
     * without verifying the account.
     */
    cy.completeAndSubmitCreateAccountForm();

    // go back to the create account page
    cy.go('back');

    /**
     * navigate to the sign in page,
     * without a verified  account.
     */
    yourDetailsPage.signInButtonLink().click();

    cy.assertUrl(signInUrl);
  });

  describe('form submission with all valid required fields', () => {
    beforeEach(() => {
      /**
       * Get the account ID directly from the API,
       * so that we can assert that the URL has the correct ID.
       */
      const accountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');

      cy.getAccountByEmail(accountEmail).then((responseData) => {
        const [firstAccount] = responseData;
        account = firstAccount;
      });
    });

    it(`should redirect to ${CONFIRM_EMAIL_RESENT}`, () => {
      cy.navigateToUrl(signInUrl);

      cy.completeAndSubmitSignInAccountForm({ assertRedirectUrl: false });

      const expectedUrl = `${confirmEmailResentUrl}?id=${account.id}`;

      cy.assertUrl(expectedUrl);
    });
  });
});
