import { backLink, field as fieldSelector } from '../../../../../../pages/shared';
import { signInPage } from '../../../../../../pages/insurance/account/sign-in';
import { yourDetailsPage } from '../../../../../../pages/insurance/account/create';
import { BUTTONS, PAGES } from '../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { ACCOUNT_FIELDS } from '../../../../../../content-strings/fields/insurance/account';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.PASSWORD_RESET.ROOT;

const {
  ACCOUNT: {
    SIGN_IN: { ROOT: SIGN_IN_ROOT },
    PASSWORD_RESET: { ROOT: PASSWORD_RESET_ROOT, LINK_SENT },
  },
} = ROUTES;

const {
  ACCOUNT: { EMAIL },
} = INSURANCE_FIELD_IDS;

const FIELD_STRINGS = ACCOUNT_FIELDS.PASSWORD_RESET;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Account - Password reset page - As an Exporter, I want to reset my password on my UKEF digital service account, So that I can maintain my account security and sign in into my UKEF digital service account', () => {
  let url;

  before(() => {
    cy.deleteAccount();

    cy.completeAndSubmitCreateAccountForm({ navigateToAccountCreationPage: true });

    // go back to create account page
    backLink().click();

    // navigate to sign in page
    yourDetailsPage.signInButtonLink().click();

    // navigate to password reset page
    signInPage.resetPasswordLink().click();

    url = `${baseUrl}${PASSWORD_RESET_ROOT}`;

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccount();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: PASSWORD_RESET_ROOT,
      backLink: SIGN_IN_ROOT,
      assertAuthenticatedHeader: false,
      submitButtonCopy: BUTTONS.SUBMIT,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders `email` label, hint and input', () => {
      const fieldId = EMAIL;
      const field = fieldSelector(fieldId);

      cy.checkText(field.label(), FIELD_STRINGS[fieldId].LABEL);

      field.input().should('exist');
    });
  });

  describe('form submission', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitPasswordResetForm({});
    });

    it(`should redirect to ${LINK_SENT}`, () => {
      const expected = `${baseUrl}${LINK_SENT}`;

      cy.assertUrl(expected);
    });
  });
});
