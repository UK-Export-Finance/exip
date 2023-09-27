import { emailSentPage } from '../../../../../../../pages/insurance/account/suspended';
import { submitButton } from '../../../../../../../pages/shared';
import { PAGES } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import api from '../../../../../../../commands/api';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.SUSPENDED.EMAIL_SENT;

const {
  ACCOUNT: {
    SUSPENDED: {
      ROOT: SUSPENDED_ROOT,
      EMAIL_SENT,
    },
  },
} = ROUTES;

const accountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');

context('Insurance - Account - Suspended - Email sent page - As an Exporter, I want to reactivate my suspended digital service account, So that I can securely access my account and applications with UKEF', () => {
  const baseUrl = Cypress.config('baseUrl');
  const accountSuspendedUrl = `${baseUrl}${SUSPENDED_ROOT}`;
  const accountSuspendedEmailSentUrl = `${baseUrl}${EMAIL_SENT}`;

  let accountSuspendedUrlWithIdParam;

  let account;

  before(() => {
    cy.createAnAccountAndBecomeBlocked({ startReactivationJourney: true });
  });

  after(() => {
    cy.deleteAccount();
  });

  describe('page URL and content', () => {
    before(() => {
      /**
       * Get the account ID directly from the API,
       * so that we can assert that the URL has the correct ID.
       */
      api.getAccountByEmail(accountEmail).then((response) => {
        const { data } = response.body;

        const [firstAccount] = data.accounts;
        account = firstAccount;

        accountSuspendedUrlWithIdParam = `${accountSuspendedUrl}?id=${account.id}`;

        cy.assertUrl(accountSuspendedEmailSentUrl);
      });
    });

    describe('when visiting the page', () => {
      it('renders core page elements', () => {
        cy.corePageChecks({
          pageTitle: CONTENT_STRINGS.PAGE_TITLE,
          currentHref: EMAIL_SENT,
          backLink: `${SUSPENDED_ROOT}?id=${account.id}`,
          assertAuthenticatedHeader: false,
          assertSubmitButton: false,
        });
      });
    });

    describe('page tests', () => {
      beforeEach(() => {
        cy.saveSession();

        cy.navigateToUrl(accountSuspendedUrlWithIdParam);

        submitButton().click();
      });

      it('should render `we sent link` copy', () => {
        cy.checkText(
          emailSentPage.weSentLinkTo(),
          `${CONTENT_STRINGS.WE_SENT_LINK_TO} ${accountEmail}`,
        );
      });

      it('should render `check your email` copy', () => {
        cy.checkText(
          emailSentPage.checkYourEmail(),
          CONTENT_STRINGS.CHECK_YOUR_EMAIL,
        );
      });

      it('should render `having problems` heading', () => {
        cy.checkText(
          emailSentPage.havingProblemsHeading(),
          CONTENT_STRINGS.HAVING_PROBLEMS,
        );
      });

      it('should render customer service contact details', () => {
        cy.assertCustomerServiceContactDetailsContent();
      });
    });
  });
});
