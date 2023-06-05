// import { suspendedPage } from '../../../../pages/insurance/account/suspended';
import { submitButton } from '../../../../../pages/shared';
import { BUTTONS, PAGES } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import api from '../../../../../../support/api';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.SUSPENDED.EMAIL_SENT;

const {
  ACCOUNT: {
    SUSPENDED: {
      ROOT: SUSPENDED_ROOT,
      EMAIL_SENT,
    },
  },
} = ROUTES;

context('Insurance - Account - Suspended - Email sent page', () => {
  const baseUrl = Cypress.config('baseUrl');
  const accountSuspendedEmailSentUrl = `${baseUrl}${EMAIL_SENT}`;

  let account;

  before(() => {
    cy.deleteAccount();

    cy.completeAndSubmitCreateAccountForm({ navigateToAccountCreationPage: true });

    cy.verifyAccountEmail();
  });

  after(() => {
    cy.deleteAccount();
  });

  describe('page URL and content', () => {
    beforeEach(() => {
      /**
       * Get the account ID directly from the API,
       * so that we can assert that the URL has the correct ID.
       */
      const accountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');

      api.getAccountByEmail(accountEmail).then((response) => {
        const { data } = response.body;

        const [firstAccount] = data.accounts;
        account = firstAccount;

        cy.completeAndSubmitSignInAccountFormMaximumRetries();

        submitButton().click();

        cy.assertUrl(accountSuspendedEmailSentUrl);
      });
    });

    it('renders core page elements', () => {
      cy.corePageChecks({
        pageTitle: CONTENT_STRINGS.PAGE_TITLE,
        currentHref: accountSuspendedEmailSentUrl,
        assertBackLink: false,
        assertAuthenticatedHeader: false,
        assertSubmitButton: false,
      });
    });
  });
});
