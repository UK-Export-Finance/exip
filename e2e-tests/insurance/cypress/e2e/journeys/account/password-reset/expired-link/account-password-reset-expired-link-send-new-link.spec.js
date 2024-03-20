import { yourDetailsPage } from '../../../../../../../pages/insurance/account/create';
import { signInPage } from '../../../../../../../pages/insurance/account/sign-in';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { DATE_ONE_MINUTE_IN_THE_PAST } from '../../../../../../../constants/dates';
import api from '../../../../../../../commands/api';

const {
  START,
  ACCOUNT: {
    PASSWORD_RESET: {
      NEW_PASSWORD,
      LINK_SENT,
      EXPIRED_LINK,
    },
  },
} = INSURANCE_ROUTES;

const {
  ACCOUNT: { PASSWORD_RESET_HASH, PASSWORD_RESET_EXPIRY },
} = INSURANCE_FIELD_IDS;

context('Insurance - Account - Password reset - expired link page - send new link', () => {
  const baseUrl = Cypress.config('baseUrl');

  before(() => {
    cy.deleteAccount();

    cy.navigateToUrl(START);
    cy.submitEligibilityAndStartAccountCreation();
    cy.completeAndSubmitCreateAccountForm();

    // go back to create account page
    cy.clickBackLink();

    // navigate to sign in page
    yourDetailsPage.signInButtonLink().click();

    // navigate to password reset page
    signInPage.resetPasswordLink().click();

    cy.completeAndSubmitPasswordResetForm({});
  });

  beforeEach(() => {
    cy.saveSession();
  });

  describe(`When a password reset verification token has expired and the user navigates to ${NEW_PASSWORD} with the expired token and clicks the 'send new link' button/submits the form`, () => {
    let updatedAccount;

    beforeEach(async () => {
      /**
       * Get the account so that we can use the ID
       * to update the password reset verification period.
       */
      const accountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');

      const accountsResponse = await api.getAccountByEmail(accountEmail);

      const [firstAccount] = accountsResponse;
      const account = firstAccount;

      /**
       * Update the account's password reset expiry date via the API,
       * so that we can mimic missing the verification period.
       */
      const oneMinuteInThePast = DATE_ONE_MINUTE_IN_THE_PAST();

      const updateObj = {
        [PASSWORD_RESET_EXPIRY]: oneMinuteInThePast,
      };

      updatedAccount = await api.updateAccount(account.id, updateObj);
    });

    it(`should redirect to ${LINK_SENT} with ID query param`, () => {
      cy.navigateToUrl(`${baseUrl}${NEW_PASSWORD}?token=${updatedAccount[PASSWORD_RESET_HASH]}`);

      let expectedUrl = `${baseUrl}${EXPIRED_LINK}?id=${updatedAccount.id}`;

      cy.assertUrl(expectedUrl);

      cy.clickSubmitButton();

      expectedUrl = `${baseUrl}${LINK_SENT}`;

      cy.assertUrl(expectedUrl);
    });
  });
});
