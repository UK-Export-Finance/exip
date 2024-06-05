import { PAGES } from '../../../../../../../content-strings';
import { verifyEmailLinkExpiredPage } from '../../../../../../../pages/insurance/account/create';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import api from '../../../../../../../commands/api';
import { createDateOneMonthInThePast } from '../../../../../../../helpers/date';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.CREATE.VERIFY_EMAIL_EXPIRED_LINK;

const {
  START,
  ACCOUNT: {
    CREATE: 
    CONFIRM_EMAIL,
    VERIFY_EMAIL,
    VERIFY_EMAIL_EXPIRED_LINK,
    CONFIRM_EMAIL_RESENT,
  },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Account - Create - Confirm email page - expired token - As an Exporter I want to verify my email address for account creation, So that I can activate my email address and use it to create a digital service account with UKEF',
  () => {
    let url;
    let account;

    before(() => {
      cy.deleteAccount();

      cy.navigateToUrl(START);

      cy.submitEligibilityAndStartAccountCreation();
      cy.completeAndSubmitCreateAccountForm();

      url = `${baseUrl}${CONFIRM_EMAIL}`;

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

        const [firstAccount] = accountsResponse;
        account = firstAccount;

        /**
         * Update the account's verification expiry date via the API,
         * so that we can mimic missing the verification period.
         */
        const updateObj = {
          verificationExpiry: createDateOneMonthInThePast(),
        };

        updatedAccount = await api.updateAccount(account.id, updateObj);
      });

      it(`should redirect to ${VERIFY_EMAIL_EXPIRED_LINK} and render core page elements and content`, () => {
        const { verificationHash } = updatedAccount;

        const verificationUrl = `${VERIFY_EMAIL}?token=${verificationHash}&id=${account.id}`;

        cy.navigateToUrl(`${baseUrl}${verificationUrl}`);

        const expectedUrl = `${baseUrl}${VERIFY_EMAIL_EXPIRED_LINK}?id=${account.id}`;

        cy.assertUrl(expectedUrl);

        cy.corePageChecks({
          pageTitle: CONTENT_STRINGS.PAGE_TITLE,
          currentHref: verificationUrl,
          backLink: `${CONFIRM_EMAIL}?id=${account.id}`,
          hasAForm: false,
          assertAuthenticatedHeader: false,
          submitButtonCopy: CONTENT_STRINGS.REQUEST_NEW_LINK.TEXT,
        });

        // assert body content
        cy.checkText(verifyEmailLinkExpiredPage.notVerified(), CONTENT_STRINGS.NOT_VERIFIED);
        cy.checkText(verifyEmailLinkExpiredPage.canSendNewLink(), CONTENT_STRINGS.CAN_SEND_NEW_LINK);
      });

      it(`should redirect to ${CONFIRM_EMAIL_RESENT} when submitting the form`, () => {
        const { verificationHash } = updatedAccount;

        const verificationUrl = `${VERIFY_EMAIL}?token=${verificationHash}&id=${account.id}`;

        cy.navigateToUrl(`${baseUrl}${verificationUrl}`);

        cy.clickSubmitButton();

        const expectedUrl = `${baseUrl}${CONFIRM_EMAIL_RESENT}?id=${account.id}`;
        cy.assertUrl(expectedUrl);
      });
    });
  },
);
