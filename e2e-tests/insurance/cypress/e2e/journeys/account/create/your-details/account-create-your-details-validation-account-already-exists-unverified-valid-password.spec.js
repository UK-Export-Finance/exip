import { ACCOUNT as ACCOUNT_ROUTES } from '../../../../../../../constants/routes/insurance/account';
import api from '../../../../../../../commands/api';
import { createDateOneMonthInThePast } from '../../../../../../../helpers/date';

const {
  CREATE: { YOUR_DETAILS, CONFIRM_EMAIL },
} = ACCOUNT_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Account - Create - Your details page - Account already exists - unverified - valid password - As an Exporter, I want the system to verify that the email address that I register against my UKEF digital service account is unique, So that I can be sure that the system does not have multiple digital service accounts with the same email address',
  () => {
    const yourDetailsUrl = `${baseUrl}${YOUR_DETAILS}`;
    const confirmEmailUrl = `${baseUrl}${CONFIRM_EMAIL}`;
    let account;

    before(() => {
      cy.deleteAccount();

      cy.navigateToUrl(yourDetailsUrl);

      // create an account
      cy.completeAndSubmitCreateAccountForm();
    });

    describe('when trying to create an account with an email that already has an account and the provided password is correct', () => {
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

        await api.updateAccount(account.id, updateObj);
      });

      it(`should redirect to ${CONFIRM_EMAIL}`, () => {
        cy.navigateToUrl(yourDetailsUrl);

        cy.completeAndSubmitCreateAccountForm();

        cy.assertUrl(confirmEmailUrl);
      });
    });
  },
);
