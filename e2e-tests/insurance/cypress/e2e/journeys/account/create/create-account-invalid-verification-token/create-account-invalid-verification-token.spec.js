import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const accountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');

const {
  ACCOUNT: {
    CREATE: { CONFIRM_EMAIL, VERIFY_EMAIL, VERIFY_EMAIL_INVALID_LINK },
  },
} = INSURANCE_ROUTES;

context('Insurance - Account - Create - Create account and verify email with invalid token in url', () => {
  const baseUrl = Cypress.config('baseUrl');
  let accountId;
  const verifyEmailLinkInvalidUrl = `${baseUrl}${VERIFY_EMAIL_INVALID_LINK}`;

  before(() => {
    cy.deleteAccount();

    cy.clearCookies();
    Cypress.session.clearAllSavedSessions();

    cy.navigateToCheckIfEligibleUrl();

    cy.submitEligibilityAndStartAccountCreation();
    cy.completeAndSubmitCreateAccountForm();

    const expected = `${baseUrl}${CONFIRM_EMAIL}`;

    cy.assertUrl(expected);

    cy.getAccountByEmail(accountEmail).then((responseData) => {
      const [firstAccount] = responseData;

      const { id } = firstAccount;

      accountId = id;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  describe(`when navigating to ${VERIFY_EMAIL} with an invalid token in the url`, () => {
    it(`should redirect to ${VERIFY_EMAIL_INVALID_LINK}`, () => {
      const invalidToken = 'invalid';
      const url = `${baseUrl}${VERIFY_EMAIL}?token=${invalidToken}&id=${accountId}`;

      cy.navigateToUrl(url);

      cy.assertUrl(verifyEmailLinkInvalidUrl);
    });
  });
});
