import { PAGES } from '../../../../../../../content-strings';
import { verifyEmailLinkExpiredPage } from '../../../../../pages/insurance/account/create';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import api from '../../../../../../support/api';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.CREATE.VERIFY_EMAIL_EXPIRED_LINK;

const {
  START,
  ACCOUNT: { CREATE: { CONFIRM_EMAIL, VERIFY_EMAIL, VERIFY_EMAIL_EXPIRED_LINK } },
} = ROUTES;

context('Insurance - Account - Create - Confirm email page - expired token - As an Exporter I want to verify my email address for account creation, So that I can activate my email address and use it to create a digital service account with UKEF', () => {
  let url;
  let account;

  before(() => {
    cy.deleteAccount();

    cy.navigateToUrl(START);

    cy.submitEligibilityAndStartAccountCreation();
    cy.completeAndSubmitCreateAccountForm();

    url = `${Cypress.config('baseUrl')}${CONFIRM_EMAIL}`;

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  describe(`When a verification token has expired and the user navigates to ${VERIFY_EMAIL} with the expired token`, () => {
    let updatedAccount;

    beforeEach(async () => {
      /**
       * Get the account so that we can use the ID
       * to update the verification period.
       */
      const accountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');

      const accountsResponse = await api.getAccountByEmail(accountEmail);

      const { data } = accountsResponse.body;

      const [firstAccount] = data.accounts;
      account = firstAccount;

      /**
       * Update the account's verification expiry date via the API,
       * so that we can mimic missing the verification period.
       */
      const today = new Date();
      const lastMonth = new Date(today.setMonth(today.getMonth() - 1));

      const updateObj = {
        verificationExpiry: lastMonth,
      };

      updatedAccount = await api.updateAccount(account.id, updateObj);
    });

    it(`should redirect to ${VERIFY_EMAIL_EXPIRED_LINK} and render core page elements and content`, () => {
      const { verificationHash } = updatedAccount;

      cy.navigateToUrl(`${Cypress.config('baseUrl')}${VERIFY_EMAIL}?token=${verificationHash}`);

      const expectedUrl = `${Cypress.config('baseUrl')}${VERIFY_EMAIL_EXPIRED_LINK}?id=${account.id}`;

      cy.assertUrl(expectedUrl);

      cy.corePageChecks({
        pageTitle: CONTENT_STRINGS.PAGE_TITLE,
        currentHref: `${VERIFY_EMAIL}?token=${account.verificationHash}`,
        backLink: `${CONFIRM_EMAIL}?id=${account.id}`,
        assertSubmitButton: false,
        assertAuthenticatedHeader: false,
      });

      // assert body content
      cy.checkText(verifyEmailLinkExpiredPage.body(), CONTENT_STRINGS.BODY);

      // assert link to create an account
      cy.checkLink(verifyEmailLinkExpiredPage.createAccount(), CONTENT_STRINGS.CREATE_ACCOUNT.HREF, CONTENT_STRINGS.CREATE_ACCOUNT.TEXT);
    });
  });
});
