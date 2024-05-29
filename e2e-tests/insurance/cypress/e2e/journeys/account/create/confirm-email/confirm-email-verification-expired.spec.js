import { PAGES } from '../../../../../../../content-strings';
import { signInPage } from '../../../../../../../pages/insurance/account/sign-in';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import api from '../../../../../../../commands/api';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.SIGN_IN.ROOT;

const {
  START,
  ACCOUNT: {
    CREATE: { CONFIRM_EMAIL, VERIFY_EMAIL },
    SIGN_IN: { ROOT: SIGN_IN_ROOT },
  },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

const signInUrl = `${baseUrl}${SIGN_IN_ROOT}`;

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
        const today = new Date();
        const lastMonth = new Date(today.setMonth(today.getMonth() - 1));

        const updateObj = {
          verificationExpiry: lastMonth,
        };

        updatedAccount = await api.updateAccount(account.id, updateObj);

        const updateAccountStatusObj = {
          isInactive: true,
        };

        /**
         * Update the account status' isInactive via the API,
         * so that we can mimic an application being inactive.
         */
        await api.updateAccountStatus(updatedAccount.status.id, updateAccountStatusObj);
      });

      it(`should redirect to ${signInUrl} and render success banner content`, () => {
        const { verificationHash } = updatedAccount;

        const verificationUrl = `${VERIFY_EMAIL}?token=${verificationHash}&id=${account.id}`;

        cy.navigateToUrl(`${baseUrl}${verificationUrl}`);

        cy.assertUrl(signInUrl);

        const { successBanner } = signInPage;

        successBanner.container().should('exist');

        cy.checkText(successBanner.heading(), CONTENT_STRINGS.SUCCESS_BANNER.HEADING);
        cy.checkText(successBanner.continue(), CONTENT_STRINGS.SUCCESS_BANNER.SIGN_IN_TO_CONTINUE);
      });
    });
  },
);
