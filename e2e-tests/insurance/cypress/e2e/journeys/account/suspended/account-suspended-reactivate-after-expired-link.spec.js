import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { DATE_ONE_MINUTE_IN_THE_PAST } from '../../../../../../constants/dates';
import { submitButton } from '../../../../../../pages/shared';
import api from '../../../../../../commands/api';

const {
  ACCOUNT: {
    SUSPENDED: {
      VERIFY_EMAIL,
      EMAIL_SENT,
    },
    REACTIVATED_ROOT,
  },
} = INSURANCE_ROUTES;

const {
  ACCOUNT: { REACTIVATION_EXPIRY, REACTIVATION_HASH },
} = INSURANCE_FIELD_IDS;

const accountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');

context('Insurance - Account - Suspended - Reactivate account after verification link has expired', () => {
  const baseUrl = Cypress.config('baseUrl');
  const verifyEmailUrl = `${baseUrl}${VERIFY_EMAIL}`;
  const emailSentUrl = `${baseUrl}${EMAIL_SENT}`;
  const reactivatedUrl = `${baseUrl}${REACTIVATED_ROOT}`;

  let updatedAccount;

  before(() => {
    cy.createAnAccountAndBecomeBlocked({ startReactivationJourney: true });
  });

  after(() => {
    cy.deleteAccount();
  });

  describe(`when a reactivation token has expired, user navigates to ${VERIFY_EMAIL} with the expired token and submits the form`, () => {
    beforeEach(async () => {
      /**
       * Get the latest account data
       * So that we can use the ID
       * to update the reactivation verification period.
       */
      const accountsResponse = await api.getAccountByEmail(accountEmail);

      const [firstAccount] = accountsResponse;
      const account = firstAccount;

      /**
       * Update the account's reactivation expiry date via the API,
       * so that we can mimic missing the verification period.
       */
      const oneMinuteInThePast = DATE_ONE_MINUTE_IN_THE_PAST();

      const updateObj = {
        [REACTIVATION_EXPIRY]: oneMinuteInThePast,
      };

      updatedAccount = await api.updateAccount(account.id, updateObj);
    });

    it(`should redirect to ${EMAIL_SENT}`, () => {
      cy.navigateToUrl(`${verifyEmailUrl}?token=${updatedAccount[REACTIVATION_HASH]}`);

      submitButton().click();

      cy.assertUrl(emailSentUrl);
    });
  });

  describe(`when a user navigates to ${VERIFY_EMAIL} with a new, valid token and submits the form`, () => {
    let account;

    beforeEach(async () => {
      /**
       * Get the latest account data
       * So that we can use the reactivation hash/token.
       */
      const accountsResponse = await api.getAccountByEmail(accountEmail);

      const [firstAccount] = accountsResponse;
      account = firstAccount;
    });

    it(`should redirect to ${REACTIVATED_ROOT}`, () => {
      cy.navigateToUrl(`${verifyEmailUrl}?token=${account[REACTIVATION_HASH]}`);

      cy.assertUrl(reactivatedUrl);
    });
  });
});
