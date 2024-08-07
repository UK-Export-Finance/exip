import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import reactivatedPage from '../../../../../../../pages/insurance/account/reactivated';

const {
  ACCOUNT: {
    SUSPENDED: { VERIFY_EMAIL },
    SIGN_IN: { ENTER_CODE },
  },
} = ROUTES;

const accountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');

context('Insurance - Account - Create account - Create an account which already exists and is blocked, verify and sign in', () => {
  const baseUrl = Cypress.config('baseUrl');
  const enterCodeUrl = `${baseUrl}${ENTER_CODE}`;

  let account;

  after(() => {
    cy.deleteAccount();
  });

  beforeEach(() => {
    cy.createAnAccountAndBecomeBlocked({});

    cy.navigateToCheckIfEligibleUrl();
    cy.completeAndSubmitCreateAccountForm({ navigateToAccountCreationPage: true });

    cy.getAccountByEmail(accountEmail).then((responseData) => {
      const [firstAccount] = responseData;
      account = firstAccount;

      const verifyEmailUrl = `${baseUrl}${VERIFY_EMAIL}?token=${account.reactivationHash}`;

      cy.navigateToUrl(verifyEmailUrl);
    });

    reactivatedPage.continue().click();
  });

  it(`should redirect to ${enterCodeUrl} after signing in`, () => {
    cy.completeAndSubmitSignInAccountForm({});

    cy.assertUrl(enterCodeUrl);
  });
});
