import { INSURANCE_ROUTES as ROUTES } from '../../../../../../constants/routes/insurance';
import { BUTTONS, PAGES } from '../../../../../../content-strings';
import reactivatedPage from '../../../../../../pages/insurance/account/reactivated';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.REACTIVATED;

const {
  ACCOUNT: {
    SUSPENDED: { VERIFY_EMAIL },
    REACTIVATED_ROOT,
    SIGN_IN: {
      ROOT: SIGN_IN_ROOT,
    },
  },
} = ROUTES;

const accountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');

context('Insurance - Account - Reactivated page', () => {
  const baseUrl = Cypress.config('baseUrl');
  const accountReactivatedUrl = `${baseUrl}${REACTIVATED_ROOT}`;

  let account;

  before(() => {
    cy.createAnAccountAndBecomeBlocked({ startReactivationJourney: true });
  });

  after(() => {
    cy.deleteAccount();
  });

  describe(`when visting ${VERIFY_EMAIL} with a valid token`, () => {
    before(() => {
      /**
       * Get the reactivation hash directly from the API,
       * so that we can navigate to the VERIFY_EMAIL URL with a valid token
       */
      cy.getAccountByEmail(accountEmail).then((responseData) => {
        const [firstAccount] = responseData;
        account = firstAccount;

        const verifyEmailUrl = `${baseUrl}${VERIFY_EMAIL}?token=${account.reactivationHash}`;

        cy.navigateToUrl(verifyEmailUrl);

        cy.assertUrl(accountReactivatedUrl);
      });
    });

    it('renders core page elements, `thank you` copy and a button link', () => {
      cy.corePageChecks({
        pageTitle: CONTENT_STRINGS.PAGE_TITLE,
        currentHref: REACTIVATED_ROOT,
        assertBackLink: false,
        assertAuthenticatedHeader: false,
        hasAForm: false,
      });

      cy.checkText(
        reactivatedPage.thankYou(),
        CONTENT_STRINGS.THANK_YOU,
      );

      cy.checkLink(
        reactivatedPage.continue(),
        SIGN_IN_ROOT,
        BUTTONS.CONTINUE,
      );
    });
  });
});
