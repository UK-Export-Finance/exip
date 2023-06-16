import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { DATE_ONE_MINUTE_IN_THE_PAST } from '../../../../../../../constants/dates';
import { PAGES } from '../../../../../../../content-strings';
import api from '../../../../../../support/api';

const {
  ACCOUNT: {
    SUSPENDED: {
      VERIFY_EMAIL,
      VERIFY_EMAIL_LINK_EXPIRED,
    },
  },
} = ROUTES;

const {
  ACCOUNT: { REACTIVATION_EXPIRY, REACTIVATION_HASH },
} = INSURANCE_FIELD_IDS;

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.SUSPENDED.VERIFY_EMAIL_LINK_EXPIRED;

context('Insurance - Account - Suspended - Verify email - Visit with an expired token query param', () => {
  const baseUrl = Cypress.config('baseUrl');
  const verifyEmailUrl = `${baseUrl}${VERIFY_EMAIL}`;
  const verifyEmailLinkExpiredUrl = `${baseUrl}${VERIFY_EMAIL_LINK_EXPIRED}`;

  before(() => {
    cy.createAnAccountAndBecomeBlocked({ startReactivationJourney: true });
  });

  after(() => {
    cy.deleteAccount();
  });

  describe(`when a reactivation token has expired and the user navigates to ${VERIFY_EMAIL} with the expired token`, () => {
    let updatedAccount;

    beforeEach(async () => {
      /**
       * Get the account so that we can use the ID
       * to update the reactivation verification period.
       */
      const accountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');

      const accountsResponse = await api.getAccountByEmail(accountEmail);

      const { data } = accountsResponse.body;

      const [firstAccount] = data.accounts;
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

    it(`should redirect to ${VERIFY_EMAIL_LINK_EXPIRED} and render core page elements`, () => {
      cy.navigateToUrl(`${verifyEmailUrl}?token=${updatedAccount[REACTIVATION_HASH]}`);

      cy.assertUrl(verifyEmailLinkExpiredUrl);

      cy.corePageChecks({
        pageTitle: CONTENT_STRINGS.PAGE_TITLE,
        currentHref: verifyEmailUrl,
        assertBackLink: false,
        assertAuthenticatedHeader: false,
        assertSubmitButton: false,
      });
    });
  });
});
