import { backLink, submitButton } from '../../../../../../../pages/shared';
import { yourDetailsPage } from '../../../../../../../pages/insurance/account/create';
import { signInPage } from '../../../../../../../pages/insurance/account/sign-in';
import { linkExpiredPage } from '../../../../../../../pages/insurance/account/password-reset';
import { PAGES, BUTTONS } from '../../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { DATE_ONE_MINUTE_IN_THE_PAST } from '../../../../../../../constants/dates';
import api from '../../../../../../../commands/api';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.PASSWORD_RESET.EXPIRED_LINK;

const {
  START,
  ACCOUNT: {
    PASSWORD_RESET: {
      NEW_PASSWORD,
      EXPIRED_LINK,
    },
  },
} = INSURANCE_ROUTES;

const {
  ACCOUNT: { PASSWORD_RESET_HASH, PASSWORD_RESET_EXPIRY },
} = INSURANCE_FIELD_IDS;

context('Insurance - Account - Password reset - expired link page', () => {
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

  describe(`when a password reset verfication token has expired and the user navigates to ${NEW_PASSWORD} with the expired token`, () => {
    let updatedAccount;

    beforeEach(async () => {
      /**
       * Get the account so that we can use the ID
       * to update the password reset verification period.
       */
      const accountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');

      const accountsResponse = await api.getAccountByEmail(accountEmail);

      const [firstAccount] = accountsResponse.body.data.accounts;
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

    it(`should redirect to ${EXPIRED_LINK} and render core page elements and content`, () => {
      cy.navigateToUrl(`${baseUrl}${NEW_PASSWORD}?token=${updatedAccount[PASSWORD_RESET_HASH]}`);

      const expectedUrl = `${baseUrl}${EXPIRED_LINK}?id=${updatedAccount.id}`;

      cy.assertUrl(expectedUrl);

      cy.corePageChecks({
        pageTitle: CONTENT_STRINGS.PAGE_TITLE,
        currentHref: EXPIRED_LINK,
        assertBackLink: false,
        assertAuthenticatedHeader: false,
        assertSubmitButton: false,
      });

      cy.checkText(linkExpiredPage.passwordNotReset(), CONTENT_STRINGS.PASSWORD_NOT_RESET);
      cy.checkText(linkExpiredPage.ifYouWouldLike(), CONTENT_STRINGS.IF_YOU_WOULD_LIKE);

      cy.checkText(submitButton(), BUTTONS.SEND_NEW_LINK);
    });
  });
});
