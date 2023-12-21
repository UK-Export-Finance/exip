import { BUTTONS, PAGES } from '../../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { ACCOUNT_FIELDS } from '../../../../../../../content-strings/fields/insurance/account';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import api from '../../../../../../../commands/api';
import account from '../../../../../../../fixtures/account';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.PASSWORD_RESET.NEW_PASSWORD;

const {
  ACCOUNT: {
    PASSWORD_RESET: {
      ROOT: PASSWORD_RESET_ROOT,
      LINK_SENT,
      NEW_PASSWORD,
      SUCCESS,
    },
  },
} = ROUTES;

const {
  ACCOUNT: { PASSWORD },
} = INSURANCE_FIELD_IDS;

const FIELD_STRINGS = ACCOUNT_FIELDS.NEW_PASSWORD[PASSWORD];

context('Insurance - Account - Password reset - new password page - As an Exporter, I want to reset my password, So that I can securely access my digital service account with UKEF', () => {
  let url;
  let resetPasswordToken;

  before(() => {
    cy.deleteAccount();

    cy.completeAndSubmitCreateAccountForm({ navigateToAccountCreationPage: true });

    // navigate to password reset page
    cy.navigateToUrl(PASSWORD_RESET_ROOT);

    cy.completeAndSubmitPasswordResetForm({});

    url = `${Cypress.config('baseUrl')}${LINK_SENT}`;

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  describe(`when visiting ${NEW_PASSWORD} with a token query param`, () => {
    beforeEach(async () => {
      // Get an account's password reset token
      resetPasswordToken = await api.getAccountPasswordResetToken();

      url = `${Cypress.config('baseUrl')}${NEW_PASSWORD}?token=${resetPasswordToken}`;
    });

    describe('page tests', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.assertUrl(url);
      });

      it('renders core page elements', () => {
        cy.corePageChecks({
          pageTitle: CONTENT_STRINGS.PAGE_TITLE,
          currentHref: url,
          assertBackLink: false,
          assertAuthenticatedHeader: false,
          submitButtonCopy: BUTTONS.SUBMIT,
        });
      });

      describe('password', () => {
        it('renders a label, hint, and input', () => {
          cy.assertPasswordLabelHintAndInput(FIELD_STRINGS);
        });

        // TODO: EMS-2475
        // it('should render a reveal button that shows/reveals the password input', () => {
        //   cy.assertPasswordRevealButton();
        // });
      });
    });

    describe('form submission with all valid required fields', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.assertUrl(url);
      });

      it(`should redirect to ${SUCCESS}`, () => {
        const newPassword = `${account[PASSWORD]}-modified`;

        cy.completeAndSubmitNewPasswordAccountForm({ password: newPassword });

        const expected = `${Cypress.config('baseUrl')}${SUCCESS}`;
        cy.assertUrl(expected);
      });
    });
  });
});
