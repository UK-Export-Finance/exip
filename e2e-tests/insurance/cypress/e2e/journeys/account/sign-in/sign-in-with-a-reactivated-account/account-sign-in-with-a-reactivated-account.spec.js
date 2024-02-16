import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import reactivatedPage from '../../../../../../../pages/insurance/account/reactivated';

const {
  ACCOUNT: {
    SUSPENDED: { VERIFY_EMAIL },
    REACTIVATED_ROOT,
    SIGN_IN: { ENTER_CODE },
  },
  DASHBOARD,
} = ROUTES;

const accountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');

context('Insurance - Account - Sign in - after account has been blocked and reactivated', () => {
  const baseUrl = Cypress.config('baseUrl');
  const accountReactivatedUrl = `${baseUrl}${REACTIVATED_ROOT}`;
  const enterCodeUrl = `${baseUrl}${ENTER_CODE}`;
  const dashboardUrl = `${baseUrl}${DASHBOARD}`;

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
      cy.getAccountByEmail(accountEmail).then((responseData) => {
        const [firstAccount] = responseData;
        account = firstAccount;

        const verifyEmailUrl = `${baseUrl}${VERIFY_EMAIL}?token=${account.reactivationHash}`;

        cy.navigateToUrl(verifyEmailUrl);

        cy.assertUrl(accountReactivatedUrl);

        // click the "continue" link button in the reactivated page
        reactivatedPage.continue().click();

        // submit the sign in form
        cy.completeAndSubmitSignInAccountForm({});
      });
    });

    describe('when submitting the sign in form and entering a valid access code', () => {
      let validAccessCode;

      before(() => {
        // create and get an OTP for the exporter's account
        cy.accountAddAndGetOTP().then((accessCode) => {
          validAccessCode = accessCode;
        });
      });

      it(`should redirect to ${DASHBOARD}`, () => {
        cy.navigateToUrl(enterCodeUrl);

        cy.completeAndSubmitEnterCodeAccountForm(validAccessCode);

        cy.assertUrl(dashboardUrl);
      });
    });
  });
});
