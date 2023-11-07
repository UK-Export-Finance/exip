import { successPage } from '../../../../../../pages/insurance/account/password-reset';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { field, submitButton } from '../../../../../../pages/shared';
import api from '../../../../../../commands/api';
import account from '../../../../../../fixtures/account';

const {
  ACCOUNT: {
    PASSWORD_RESET: { ROOT: PASSWORD_RESET_ROOT, NEW_PASSWORD, SUCCESS },
    SIGN_IN: { ROOT: SIGN_IN_ROOT, ENTER_CODE },
  },
  DASHBOARD,
} = INSURANCE_ROUTES;

const {
  ACCOUNT: { SECURITY_CODE, PASSWORD },
} = INSURANCE_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Account - Password reset and sign in - As an Exporter, I want to login to my UKEF digital service account after my password reset, So that I can securely access my digital service account with UKEF', () => {
  const successUrl = `${baseUrl}${SUCCESS}`;
  const signInUrl = `${baseUrl}${SIGN_IN_ROOT}`;
  const enterCodeUrl = `${baseUrl}${ENTER_CODE}`;

  let newPasswordUrl;

  before(() => {
    cy.deleteAccount();

    cy.completeAndSubmitCreateAccountForm({ navigateToAccountCreationPage: true });

    cy.verifyAccountEmail();

    // navigate to password reset page
    cy.navigateToUrl(PASSWORD_RESET_ROOT);

    cy.completeAndSubmitPasswordResetForm({});
  });

  beforeEach(() => {
    cy.saveSession();
  });

  describe(`when visiting ${NEW_PASSWORD} with a token query param`, () => {
    beforeEach(async () => {
      // Get an account's password reset token
      const resetPasswordToken = await api.getAccountPasswordResetToken();

      newPasswordUrl = `${baseUrl}${NEW_PASSWORD}?token=${resetPasswordToken}`;
    });

    describe('when progressing to the sign page and completing/submitting the form', () => {
      beforeEach(() => {
        cy.navigateToUrl(newPasswordUrl);

        const newPassword = `${account[PASSWORD]}-modified`;

        cy.completeAndSubmitNewPasswordAccountForm({ password: newPassword });

        cy.assertUrl(successUrl);

        successPage.continueToSignInLinkButton().click();

        cy.assertUrl(signInUrl);

        cy.completeAndSubmitSignInAccountForm({ password: newPassword });
      });

      it(`should redirect to ${enterCodeUrl}`, () => {
        cy.assertUrl(enterCodeUrl);
      });
    });

    describe('when submitting a valid security code', () => {
      let validSecurityCode;

      before(() => {
        // create and get an OTP for the exporter's account
        cy.accountAddAndGetOTP().then((securityCode) => {
          validSecurityCode = securityCode;
        });
      });

      it(`should redirect to ${DASHBOARD}`, () => {
        cy.navigateToUrl(enterCodeUrl);

        cy.keyboardInput(field(SECURITY_CODE).input(), validSecurityCode);

        submitButton().click();

        const expectedUrl = `${baseUrl}${DASHBOARD}`;

        cy.assertUrl(expectedUrl);
      });
    });
  });
});
