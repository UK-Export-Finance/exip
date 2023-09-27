import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import api from '../../../../../../../commands/api';

const {
  ACCOUNT: {
    SUSPENDED: { VERIFY_EMAIL },
    REACTIVATED_ROOT,
  },
} = ROUTES;

const accountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');

context('Insurance - Account - Suspended - Verify email - As an Exporter - I want to reactivate my suspended digital service account , So that I can securely access my account and applications with UKEF', () => {
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
      api.getAccountByEmail(accountEmail).then((response) => {
        const { data } = response.body;

        const [firstAccount] = data.accounts;
        account = firstAccount;

        const verifyEmailUrl = `${baseUrl}${VERIFY_EMAIL}?token=${account.reactivationHash}`;

        cy.navigateToUrl(verifyEmailUrl);
      });
    });

    it(`should redirect to ${REACTIVATED_ROOT}`, () => {
      cy.assertUrl(accountReactivatedUrl);
    });
  });
});
