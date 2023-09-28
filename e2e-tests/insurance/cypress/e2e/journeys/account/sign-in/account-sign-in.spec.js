import { signInPage } from '../../../../../../pages/insurance/account/sign-in';
import { yourDetailsPage } from '../../../../../../pages/insurance/account/create';
import accountFormFields from '../../../../../../partials/insurance/accountFormFields';
import { PAGES } from '../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { ACCOUNT_FIELDS } from '../../../../../../content-strings/fields/insurance/account';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.SIGN_IN.ROOT;

const {
  START,
  ACCOUNT: {
    SIGN_IN: { ROOT: SIGN_IN_ROOT, ENTER_CODE },
    CREATE: { YOUR_DETAILS },
  },
} = ROUTES;

const {
  ACCOUNT: { EMAIL, PASSWORD },
} = INSURANCE_FIELD_IDS;

const FIELD_STRINGS = ACCOUNT_FIELDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Account - Sign in - As an Exporter, I want to sign in into my UKEF digital service account after completing eligibility, So that I can complete my application for a UKEF Export Insurance Policy', () => {
  let url;

  before(() => {
    cy.deleteAccount();

    cy.navigateToUrl(START);

    cy.submitEligibilityAndStartAccountCreation();
    cy.completeAndSubmitCreateAccountForm();

    // go back to the create account page
    cy.go('back');

    // navigate to sign in page
    yourDetailsPage.signInButtonLink().click();

    url = `${baseUrl}${SIGN_IN_ROOT}`;

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: SIGN_IN_ROOT,
      backLink: YOUR_DETAILS,
      assertAuthenticatedHeader: false,
      lightHouseThresholds: {
        performance: 70,
      },
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders `email` label and input', () => {
      const fieldId = EMAIL;
      const field = accountFormFields[fieldId];

      field.label().should('exist');
      cy.checkText(field.label(), FIELD_STRINGS[fieldId].LABEL);

      field.input().should('exist');
    });

    describe('password', () => {
      const fieldId = PASSWORD;
      const field = accountFormFields[fieldId];

      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('renders a label and input', () => {
        field.label().should('exist');
        cy.checkText(field.label(), FIELD_STRINGS.SIGN_IN[fieldId].LABEL);

        field.input().should('exist');
      });

      it('should render a reveal button that shows/reveals the password input', () => {
        cy.assertPasswordRevealButton();
      });
    });

    it('renders a `reset password` link', () => {
      const expectedHref = CONTENT_STRINGS.PASSWORD_RESET.HREF;
      const expectedText = CONTENT_STRINGS.PASSWORD_RESET.TEXT;

      cy.checkLink(
        signInPage.resetPasswordLink(),
        expectedHref,
        expectedText,
      );
    });

    it('renders a `need to create an account` copy and button link', () => {
      cy.checkText(signInPage.needToCreateAccountHeading(), CONTENT_STRINGS.NEED_TO_CREATE_ACCOUNT.HEADING);

      const expectedHref = CONTENT_STRINGS.NEED_TO_CREATE_ACCOUNT.LINK.HREF;
      const expectedText = CONTENT_STRINGS.NEED_TO_CREATE_ACCOUNT.LINK.TEXT;

      cy.checkLink(
        signInPage.createAccountLink(),
        expectedHref,
        expectedText,
      );
    });

    it(`should redirect to ${YOUR_DETAILS} when clicking 'need to create an account'`, () => {
      signInPage.createAccountLink().click();

      const expectedUrl = `${baseUrl}${YOUR_DETAILS}`;

      cy.assertUrl(expectedUrl);
    });
  });

  describe('when the account is verified', () => {
    before(() => {
      cy.verifyAccountEmail();
    });

    describe('form submission with all valid required fields', () => {
      it(`should redirect to ${ENTER_CODE}`, () => {
        cy.navigateToUrl(url);

        cy.completeAndSubmitSignInAccountForm({});

        const expected = `${baseUrl}${ENTER_CODE}`;
        cy.assertUrl(expected);
      });
    });
  });
});
