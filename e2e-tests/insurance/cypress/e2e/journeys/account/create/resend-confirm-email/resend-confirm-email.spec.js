import { confirmEmailPage } from '../../../../../../../pages/insurance/account/create';
import { PAGES } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.CREATE.CONFIRM_EMAIL_RESENT;

const {
  ACCOUNT: {
    CREATE: { CONFIRM_EMAIL, CONFIRM_EMAIL_RESENT },
  },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Account - Create - Resend confirm email page - As an Exporter I want to request a new link to confirm my email address, So that I can readily use my email address to set up an account that I can use for UKEF digital service such as EXIP digital service',
  () => {
    before(() => {
      cy.deleteAccount();

      cy.navigateToCheckIfEligibleUrl();

      cy.submitEligibilityAndStartAccountCreation();
      cy.completeAndSubmitCreateAccountForm();

      confirmEmailPage.havingProblems.requestNew.link().click();
    });

    beforeEach(() => {
      cy.saveSession();
    });

    describe('core page elements and content', () => {
      let account;
      let url;

      before(() => {
        /**
         * Get the account ID directly from the API,
         * so that we can assert that the URL and `request a new link` has the correct ID.
         */
        const accountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');

        cy.getAccountByEmail(accountEmail).then((responseData) => {
          const [firstAccount] = responseData;
          account = firstAccount;

          url = `${CONFIRM_EMAIL_RESENT}?id=${account.id}`;

          cy.assertUrl(`${baseUrl}${url}`);
        });
      });

      it('renders core page elements', () => {
        cy.corePageChecks({
          pageTitle: CONTENT_STRINGS.PAGE_TITLE,
          currentHref: url,
          backLink: `${CONFIRM_EMAIL}?id=${account.id}`,
          hasAForm: false,
          assertAuthenticatedHeader: false,
          assertSaveAndBackButtonDoesNotExist: true,
        });
      });

      it('renders all `confirm email` page content', () => {
        cy.navigateToUrl(url);

        cy.assertConfirmEmailPageContent(account.id);
      });
    });
  },
);
