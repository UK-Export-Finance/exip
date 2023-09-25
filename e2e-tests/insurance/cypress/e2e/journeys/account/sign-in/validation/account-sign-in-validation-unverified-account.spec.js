import { yourDetailsPage, confirmEmailPage } from '../../../../../../../pages/insurance/account/create';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import { PAGES } from '../../../../../../../content-strings';

const {
  START,
  ACCOUNT: {
    SIGN_IN: { ROOT: SIGN_IN_ROOT },
    CREATE: { CONFIRM_EMAIL_RESENT },
  },
} = ROUTES;

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.CREATE.CONFIRM_EMAIL_RESENT;

const accountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');

context('Insurance - Account - Sign in - Validation - unverified account', () => {
  let account;

  before(() => {
    cy.deleteAccount();

    cy.navigateToUrl(START);

    // create an account but do not verify the account
    cy.submitEligibilityAndStartAccountCreation();
    cy.completeAndSubmitCreateAccountForm();

    cy.clickBackLink();

    yourDetailsPage.signInButtonLink().click();

    const expectedUrl = `${Cypress.config('baseUrl')}${SIGN_IN_ROOT}`;
    cy.assertUrl(expectedUrl);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  describe('when valid credentials are submitted, but the account is not verified', () => {
    beforeEach(() => {
      /**
       * Get the account ID directly from the API,
       * so that we can assert that the URL has the correct ID.
       */

      cy.getAccountByEmail(accountEmail).then((responseData) => {
        const [firstAccount] = responseData;
        account = firstAccount;

        cy.completeAndSubmitSignInAccountForm({ assertRedirectUrl: false });
      });
    });

    it(`should redirect to ${CONFIRM_EMAIL_RESENT} with account ID in the URL params and render submitted email copy`, () => {
      const expectedUrl = `${Cypress.config('baseUrl')}${CONFIRM_EMAIL_RESENT}?id=${account.id}`;

      cy.assertUrl(expectedUrl);

      const expected = `${CONTENT_STRINGS.WE_SENT_LINK_TO} ${accountEmail}`;

      cy.checkText(confirmEmailPage.weSentLinkTo(), expected);
    });
  });
});
