import { suspendedPage } from '../../../../pages/insurance/account/suspended';
import { submitButton } from '../../../../pages/shared';
import { BUTTONS, PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../constants/routes/insurance';
import api from '../../../../../support/api';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.SUSPENDED.ROOT;

const {
  ACCOUNT: {
    SIGN_IN: { ROOT: SIGN_IN_ROOT },
    SUSPENDED: { ROOT: SUSPENDED_ROOT },
  },
} = ROUTES;

context('Insurance - Account - Suspended page', () => {
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

  after(() => {
    cy.deleteAccount();
  });

  describe('page URL and content', () => {
    beforeEach(() => {
      /**
       * Get the account ID directly from the API,
       * so that we can assert that `request a new link` has the correct ID.
       */
      const accountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');

      api.getAccountByEmail(accountEmail).then((response) => {
        const { data } = response.body;

        const [firstAccount] = data.accounts;
        account = firstAccount;

        cy.completeAndSubmitSignInAccountFormMaximumRetries();

        const expectedUrl = `${accountSuspendedUrl}?id=${account.id}`;

        cy.assertUrl(expectedUrl);
      });
    });

    it('renders core page elements and body copy', () => {
      cy.corePageChecks({
        pageTitle: CONTENT_STRINGS.PAGE_TITLE,
        currentHref: accountSuspendedUrl,
        assertBackLink: false,
        assertAuthenticatedHeader: false,
        assertSubmitButton: false,
        submitButtonCopy: BUTTONS.REACTIVATE_ACCOUNT,
      });

      cy.checkText(suspendedPage.body(), CONTENT_STRINGS.BODY);
    });
  });
});
