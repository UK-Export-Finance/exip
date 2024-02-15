import { yourDetailsPage } from '../../../../../../../pages/insurance/account/create';
import { field as fieldSelector } from '../../../../../../../pages/shared';
import { BUTTONS, PAGES } from '../../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { ACCOUNT_FIELDS } from '../../../../../../../content-strings/fields/insurance/account';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.CREATE.YOUR_DETAILS;

const {
  START,
  ELIGIBILITY: { HAVE_AN_ACCOUNT },
  ACCOUNT: { CREATE: { YOUR_DETAILS, CONFIRM_EMAIL }, SIGN_IN },
} = ROUTES;

const {
  ACCOUNT: {
    FIRST_NAME,
    LAST_NAME,
    EMAIL,
    PASSWORD,
  },
} = INSURANCE_FIELD_IDS;

const FIELD_STRINGS = ACCOUNT_FIELDS.CREATE.YOUR_DETAILS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Account - Create - Your details page - As an exporter, I want to provide my details when creating my UKEF digital service account, So that the details of the UKEF digital service account created can be unique to me', () => {
  let url;

  before(() => {
    cy.deleteAccount();

    cy.navigateToUrl(START);

    cy.submitEligibilityAndStartAccountCreation();

    url = `${baseUrl}${YOUR_DETAILS}`;

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: YOUR_DETAILS,
      backLink: HAVE_AN_ACCOUNT,
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

    it('renders intro text', () => {
      cy.checkIntroText(CONTENT_STRINGS.INTRO);
    });

    it('renders `first name` label and input', () => {
      const fieldId = FIRST_NAME;
      const field = fieldSelector(fieldId);

      cy.checkText(field.label(), FIELD_STRINGS[fieldId].LABEL);

      field.input().should('exist');
    });

    it('renders `last name` label and input', () => {
      const fieldId = LAST_NAME;
      const field = fieldSelector(fieldId);

      cy.checkText(field.label(), FIELD_STRINGS[fieldId].LABEL);

      field.input().should('exist');
    });

    it('renders `email` label and input', () => {
      const fieldId = EMAIL;
      const field = fieldSelector(fieldId);

      cy.checkText(field.label(), ACCOUNT_FIELDS[fieldId].LABEL);

      field.input().should('exist');
    });

    describe('password', () => {
      it('renders a label, hint, and input', () => {
        const passwordFieldStrings = ACCOUNT_FIELDS.CREATE.YOUR_DETAILS[PASSWORD];

        cy.assertPasswordLabelHintAndInput(passwordFieldStrings);
      });

      it('should render a reveal button that shows/reveals the password input', () => {
        cy.assertPasswordRevealButton();
      });
    });

    describe('privacy notice', () => {
      const { privacyNotice } = yourDetailsPage;
      const privacyNoticeContentStrings = CONTENT_STRINGS.PRIVACY;

      it('renders a privacy notice heading', () => {
        cy.checkText(privacyNotice.heading(), privacyNoticeContentStrings.HEADING);
      });

      it('renders the privacy notice text', () => {
        cy.checkText(privacyNotice.text(), `${privacyNoticeContentStrings.MAIN_TEXT} ${privacyNoticeContentStrings.LINK.TEXT}`);
      });

      it(`renders the privacy notice link and href to ${privacyNoticeContentStrings.LINK.HREF}`, () => {
        cy.checkLink(privacyNotice.link(), privacyNoticeContentStrings.LINK.HREF, privacyNoticeContentStrings.LINK.TEXT);
      });
    });

    it('renders a `already got an account` copy and button link', () => {
      cy.checkText(yourDetailsPage.alreadyGotAnAccountHeading(), CONTENT_STRINGS.ALREADY_GOT_AN_ACCOUNT);

      const expectedHref = SIGN_IN.ROOT;
      const expectedText = BUTTONS.SIGN_IN;

      cy.checkLink(
        yourDetailsPage.signInButtonLink(),
        expectedHref,
        expectedText,
      );
    });

    describe('when clicking `already got an account`', () => {
      it(`should redirect to ${SIGN_IN.ROOT}`, () => {
        yourDetailsPage.signInButtonLink().click();

        const expectedUrl = `${baseUrl}${SIGN_IN.ROOT}`;

        cy.assertUrl(expectedUrl);
      });
    });

    describe('form submission with all valid required fields', () => {
      before(() => {
        // go back to the page
        cy.go('back');
      });

      it(`should redirect to ${CONFIRM_EMAIL}`, () => {
        cy.completeAndSubmitCreateAccountForm();

        const expected = `${baseUrl}${CONFIRM_EMAIL}`;
        cy.assertUrl(expected);
      });
    });
  });
});
