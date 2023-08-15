import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  ACCOUNT: {
    SIGN_IN: { ROOT: SIGN_IN_ROOT, ENTER_CODE },
  },
  DASHBOARD,
} = ROUTES;

context('Insurance - Account - Sign in - Submitting the form with valid credentials multiple times should NOT block the account and allow the user to sign in', () => {
  const baseUrl = Cypress.config('baseUrl');
  const signInUrl = `${baseUrl}${SIGN_IN_ROOT}`;
  const enterCodeUrl = `${baseUrl}${ENTER_CODE}`;
  const dashboardUrl = `${baseUrl}${DASHBOARD}`;

  before(() => {
    cy.deleteAccount();

    cy.completeAndSubmitCreateAccountForm({ navigateToAccountCreationPage: true });

    cy.verifyAccountEmail();

    cy.assertUrl(signInUrl);
  });

  describe('when attempting sign in with valid credentials multiple times - same amount of times as the maximum invalid retries threshold', () => {
    beforeEach(() => {
      cy.saveSession();

      cy.navigateToUrl(signInUrl);

      cy.completeAndSubmitSignInAccountFormMaximumInvalidRetries({});
    });

    it(`should redirect to ${ENTER_CODE}`, () => {
      cy.assertUrl(enterCodeUrl);
    });
  });

  describe('when attempting to sign in for an additional time after the same amount of attempts it would take for invalid credential attempts to block an account', () => {
    before(() => {
      cy.saveSession();

      cy.navigateToUrl(signInUrl);

      cy.completeAndSubmitSignInAccountForm({ assertRedirectUrl: false });
    });

    it(`should redirect to ${ENTER_CODE}`, () => {
      cy.assertUrl(enterCodeUrl);
    });

    describe('when submitting a valid security code', () => {
      let validSecurityCode;

      before(() => {
        cy.saveSession();

        // create and get an OTP for the exporter's account
        cy.accountAddAndGetOTP().then((securityCode) => {
          validSecurityCode = securityCode;
        });
      });

      it(`should successfully sign the user in and redirect to ${DASHBOARD}`, () => {
        cy.navigateToUrl(enterCodeUrl);

        cy.completeAndSubmitEnterCodeAccountForm(validSecurityCode);

        cy.assertUrl(dashboardUrl);
      });
    });
  });
});
