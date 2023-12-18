import { successPage } from '../../../../../../../pages/insurance/account/password-reset';
import { BUTTONS, PAGES } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import api from '../../../../../../../commands/api';
import account from '../../../../../../../fixtures/account';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.PASSWORD_RESET.SUCCESS;

const {
  ACCOUNT: {
    PASSWORD_RESET: { ROOT: PASSWORD_RESET_ROOT, NEW_PASSWORD, SUCCESS },
    SIGN_IN: { ROOT: SIGN_IN_ROOT },
  },
} = ROUTES;

const {
  ACCOUNT: { PASSWORD },
} = INSURANCE_FIELD_IDS;

context('Insurance - Account - Password reset - success page - I want to reset my password, So that I can securely access my digital service account with UKEF', () => {
  const successUrl = `${Cypress.config('baseUrl')}${SUCCESS}`;
  let newPasswordUrl;

  before(() => {
    cy.deleteAccount();

    cy.completeAndSubmitCreateAccountForm({ navigateToAccountCreationPage: true });

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

      newPasswordUrl = `${Cypress.config('baseUrl')}${NEW_PASSWORD}?token=${resetPasswordToken}`;
    });

    describe('when progressing to the password reset success page', () => {
      beforeEach(() => {
        cy.navigateToUrl(newPasswordUrl);

        const newPassword = `${account[PASSWORD]}-modified`;

        cy.completeAndSubmitNewPasswordAccountForm({ password: newPassword });

        cy.assertUrl(successUrl);
      });

      it('renders core page elements and a link button to sign in', () => {
        cy.corePageChecks({
          pageTitle: CONTENT_STRINGS.PAGE_TITLE,
          currentHref: successUrl,
          assertBackLink: false,
          assertAuthenticatedHeader: false,
          hasAForm: false,
        });

        cy.checkLink(
          successPage.continueToSignInLinkButton(),
          SIGN_IN_ROOT,
          BUTTONS.CONTINUE_TO_SIGN_IN,
        );
      });
    });
  });
});
