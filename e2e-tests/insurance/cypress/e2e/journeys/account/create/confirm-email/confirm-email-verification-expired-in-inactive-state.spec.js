import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import { ACCOUNT } from '../../../../../../../constants';
import api from '../../../../../../../commands/api';
import { createDateOneMonthInThePast } from '../../../../../../../helpers/date';

const { IS_INACTIVE } = ACCOUNT;

const {
  START,
  ACCOUNT: {
    CREATE: { CONFIRM_EMAIL, VERIFY_EMAIL, CONFIRM_EMAIL_RESENT },
  },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context(
  `Insurance - Account - Create - Confirm email page - expired verification and ${IS_INACTIVE} flag set - As an Exporter I want to verify my email address for account creation, So that I can activate my email address and use it to create a digital service account with UKEF`,
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

    describe(`When a verification token has expired and the ${IS_INACTIVE} flag is set and the user navigates to ${VERIFY_EMAIL} with the expired token`, () => {
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

        /**
         * Update the account status' isInactive flag via the API,
         * so that we can mimic an inactive account.
         */
        const updateStatusObj = {
          isInactive: true,
        };

        await api.updateAccountStatus(updatedAccount.status.id, updateStatusObj);
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
