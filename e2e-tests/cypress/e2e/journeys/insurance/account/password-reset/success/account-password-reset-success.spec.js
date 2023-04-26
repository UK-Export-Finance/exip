import { backLink, submitButton } from '../../../../../pages/shared';
import { signInPage } from '../../../../../pages/insurance/account/sign-in';
import { yourDetailsPage } from '../../../../../pages/insurance/account/create';
import { successPage } from '../../../../../pages/insurance/account/password-reset';
import accountFormFields from '../../../../../partials/insurance/accountFormFields';
import { BUTTONS, PAGES } from '../../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import api from '../../../../../../support/api';
import mockAccount from '../../../../../../fixtures/account';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.PASSWORD_RESET.SUCCESS;

const {
  START,
  ACCOUNT: {
    PASSWORD_RESET: { NEW_PASSWORD, SUCCESS },
    SIGN_IN: { ROOT: SIGN_IN_ROOT },
  },
} = ROUTES;

const {
  ACCOUNT: { EMAIL },
} = INSURANCE_FIELD_IDS;

context('Insurance - Account - Password reset - success page - I want to reset my password, So that I can securely access my digital service account with UKEF', () => {
  const successUrl = `${Cypress.config('baseUrl')}${SUCCESS}`;
  let newPasswordUrl;

  before(() => {
    cy.navigateToUrl(START);
    cy.submitEligibilityAndStartAccountCreation();
    cy.completeAndSubmitCreateAccountForm();

    // go back to create account page
    backLink().click();

    // navigate to sign in page
    yourDetailsPage.signInButtonLink().click();

    // navigate to password reset page
    signInPage.resetPasswordLink().click();

    cy.keyboardInput(accountFormFields[EMAIL].input(), mockAccount[EMAIL]);

    submitButton().click();
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccount();
  });

  describe(`when visiting ${NEW_PASSWORD} with a token query param`, () => {
    beforeEach(async () => {
      /**
       * Get an account's password reset token directly from the API,
       * so that we can visit the `new password` page and continue the journey.
       * This is to ensure that we are testing a real world scenario.
       *
       * The alternative approach is to either intercept the UI requests and fake the password reset token generation,
       * or have email inbox testing capabilities which can be risky/flaky.
       * This approach practically mimics "get my password reset link from my email inbox".
       */
      const exporterEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');

      const resetPasswordToken = await api.getAccountPasswordResetToken(exporterEmail);

      newPasswordUrl = `${Cypress.config('baseUrl')}${NEW_PASSWORD}?token=${resetPasswordToken}`;
    });

    describe('when progressing to the password reset success page', () => {
      beforeEach(() => {
        cy.navigateToUrl(newPasswordUrl);

        cy.completeAndSubmitNewPasswordAccountForm();

        cy.url().should('eq', successUrl);
      });

      it('renders core page elements and a link button to sign in', () => {
        cy.corePageChecks({
          pageTitle: CONTENT_STRINGS.PAGE_TITLE,
          currentHref: successUrl,
          assertBackLink: false, // TODO remove back link from page
          assertAuthenticatedHeader: false,
          assertSubmitButton: false,
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
