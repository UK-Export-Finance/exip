import { body } from '../../../../../../pages/shared';
import { PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.SUSPENDED.ROOT;

const {
  ACCOUNT: {
    SUSPENDED: { ROOT: SUSPENDED_ROOT },
  },
} = ROUTES;

context('Insurance - Account - Suspended page - As an Exporter, I want to reactivate my suspended digital service account, So that I can securely access my account and applications with UKEF', () => {
  const baseUrl = Cypress.config('baseUrl');
  const accountSuspendedUrl = `${baseUrl}${SUSPENDED_ROOT}`;

  let account;

  before(() => {
    cy.createAnAccountAndBecomeBlocked({});
  });

  after(() => {
    cy.deleteAccount();
  });

  describe('page URL and content', () => {
    beforeEach(() => {
      /**
       * Get the account ID directly from the API,
       * so that we can assert that the URL has the correct account ID.
       */
      const accountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');

      cy.getAccountByEmail(accountEmail).then((responseData) => {
        const [firstAccount] = responseData;
        account = firstAccount;

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
        hasAForm: false,
      });

      cy.checkText(body(), CONTENT_STRINGS.BODY);
    });
  });
});
