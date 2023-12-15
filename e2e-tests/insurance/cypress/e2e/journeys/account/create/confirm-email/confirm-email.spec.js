import { PAGES } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.CREATE.CONFIRM_EMAIL;

const {
  START,
  ACCOUNT: { CREATE: { YOUR_DETAILS, CONFIRM_EMAIL } },
} = ROUTES;

context('Insurance - Account - Create - Confirm email page - As an Exporter I want to create an account for UKEF digital service, So that I can readily use it for my Export Insurance Application with UKEF', () => {
  before(() => {
    cy.deleteAccount();

    cy.navigateToUrl(START);

    cy.submitEligibilityAndStartAccountCreation();
    cy.completeAndSubmitCreateAccountForm();

    const expected = `${Cypress.config('baseUrl')}${CONFIRM_EMAIL}`;

    cy.assertUrl(expected);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  let account;
  let expectedUrl;

  describe('page URL and content', () => {
    beforeEach(() => {
      /**
       * Get the account ID directly from the API,
       * so that we can assert that `request a new link` has the correct ID.
       */
      const accountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');

      cy.getAccountByEmail(accountEmail).then((responseData) => {
        const [firstAccount] = responseData;
        account = firstAccount;
      });
    });

    it(`should redirect to ${CONFIRM_EMAIL} and render core page elements and content`, () => {
      expectedUrl = CONFIRM_EMAIL;

      cy.assertUrl(`${Cypress.config('baseUrl')}${expectedUrl}`);

      cy.corePageChecks({
        pageTitle: CONTENT_STRINGS.PAGE_TITLE,
        currentHref: `${CONFIRM_EMAIL}?id=${account.id}`,
        backLink: YOUR_DETAILS,
        hasAForm: false,
        assertAuthenticatedHeader: false,
        lightHouseThresholds: {
          performance: 69,
        },
      });

      // assert confirm email content
      cy.assertConfirmEmailPageContent(account.id);
    });
  });
});
