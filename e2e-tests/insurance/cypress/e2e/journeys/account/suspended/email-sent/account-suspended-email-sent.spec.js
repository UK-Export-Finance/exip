import { emailSentPage } from '../../../../../../../pages/insurance/account/suspended';
import { PAGES } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.SUSPENDED.EMAIL_SENT;

const {
  CONTACT_DETAILS: { EMAIL, OUTRO },
} = CONTENT_STRINGS;

const {
  ACCOUNT: {
    SUSPENDED: { ROOT: SUSPENDED_ROOT, EMAIL_SENT },
  },
} = ROUTES;

const accountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');

context(
  'Insurance - Account - Suspended - Email sent page - As an Exporter, I want to reactivate my suspended digital service account, So that I can securely access my account and applications with UKEF',
  () => {
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
        cy.getAccountByEmail(accountEmail).then((responseData) => {
          const [firstAccount] = responseData;
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
            hasAForm: false,
          });
        });
      });

      describe('page tests', () => {
        beforeEach(() => {
          cy.saveSession();

          cy.navigateToUrl(accountSuspendedUrlWithIdParam);

          cy.clickSubmitButton();
        });

        it('should render `we sent link` copy', () => {
          cy.checkText(emailSentPage.weSentLinkTo(), `${CONTENT_STRINGS.WE_SENT_LINK_TO} ${accountEmail}`);
        });

        it('should render `check your email` copy', () => {
          cy.checkText(emailSentPage.checkYourEmail(), CONTENT_STRINGS.CHECK_YOUR_EMAIL);
        });

        it('should render `email if having problems`', () => {
          cy.checkText(emailSentPage.emailPrefix(), EMAIL.PREFIX);

          cy.checkLink(emailSentPage.emailLink(), EMAIL.VALUE, EMAIL.TEXT);

          cy.checkText(emailSentPage.emailOutro(), OUTRO);
        });
      });
    });
  },
);
