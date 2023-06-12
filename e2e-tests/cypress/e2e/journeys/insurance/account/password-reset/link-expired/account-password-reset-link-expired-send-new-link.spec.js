import { backLink, submitButton } from '../../../../../pages/shared';
import { yourDetailsPage } from '../../../../../pages/insurance/account/create';
import { signInPage } from '../../../../../pages/insurance/account/sign-in';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import api from '../../../../../../support/api';

const {
  START,
  ACCOUNT: {
    PASSWORD_RESET: {
      NEW_PASSWORD,
      LINK_SENT,
      LINK_EXPIRED,
    },
  },
} = INSURANCE_ROUTES;

const {
  ACCOUNT: { PASSWORD_RESET_HASH, PASSWORD_RESET_EXPIRY },
} = INSURANCE_FIELD_IDS;

context('Insurance - Account - Password reset - link expired page - send new link', () => {
  const baseUrl = Cypress.config('baseUrl');

  before(() => {
    cy.deleteAccount();

    cy.navigateToUrl(START);
    cy.submitEligibilityAndStartAccountCreation();
    cy.completeAndSubmitCreateAccountForm();

    // go back to create account page
    backLink().click();

    // navigate to sign in page
    yourDetailsPage.signInButtonLink().click();

    // navigate to password reset page
    signInPage.resetPasswordLink().click();

    cy.completeAndSubmitPasswordResetForm({});
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccount();
  });

  describe(`When a password reset verfication token has expired and the user navigates to ${NEW_PASSWORD} with the expired token and clicks the 'send new link' button/submits the form`, () => {
    let updatedAccount;

    beforeEach(async () => {
      /**
       * Get the account so that we can use the ID
       * to update the password reset verification period.
       */
      const accountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');

      const accountsResponse = await api.getAccountByEmail(accountEmail);

      const { data } = accountsResponse.body;

      const [firstAccount] = data.accounts;
      const account = firstAccount;

      /**
       * Update the account's password reset expiry date via the API,
       * so that we can mimic missing the verification period.
       */
      const now = new Date();

      const milliseconds = 300000;
      const oneMinuteAgo = new Date(now.setMilliseconds(-milliseconds)).toISOString();

      const updateObj = {
        [PASSWORD_RESET_EXPIRY]: oneMinuteAgo,
      };

      updatedAccount = await api.updateAccount(account.id, updateObj);
    });

    it(`should redirect to ${LINK_SENT} with ID query param`, () => {
      cy.navigateToUrl(`${baseUrl}${NEW_PASSWORD}?token=${updatedAccount[PASSWORD_RESET_HASH]}`);

      let expectedUrl = `${baseUrl}${LINK_EXPIRED}?id=${updatedAccount.id}`;

      cy.assertUrl(expectedUrl);

      submitButton().click();

      expectedUrl = `${baseUrl}${LINK_SENT}`;

      cy.assertUrl(expectedUrl);
    });
  });
});
