import { heading, submitButton } from '../../../../../pages/shared';
import partials from '../../../../../partials';
import { yourDetailsPage } from '../../../../../pages/insurance/account/create';
import {
  BUTTONS,
  ORGANISATION,
  LINKS,
  PAGES,
} from '../../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { ACCOUNT_FIELDS } from '../../../../../../../content-strings/fields/insurance/account';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import account from '../../../../../../fixtures/account';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.CREATE.YOUR_DETAILS;

const {
  START,
  ELIGIBILITY: { ALREADY_HAVE_ACCOUNT },
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

context('Insurance - Account - Create - Your details page - As an exporter, I want to provide my details when creating my UKEF digital service account, So that the details of the UKEF digital service account created can be unique to me', () => {
  before(() => {
    cy.navigateToUrl(START);

    cy.submitEligibilityAndStartAccountCreation();

    const expected = `${Cypress.config('baseUrl')}${YOUR_DETAILS}`;

    cy.url().should('eq', expected);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it('passes the audits', () => {
    cy.lighthouse({
      accessibility: 100,
      performance: 75,
      'best-practices': 100,
      seo: 70,
    });
  });

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');
    cy.checkText(partials.backLink(), LINKS.BACK);

    partials.backLink().click();

    const expectedUrl = `${Cypress.config('baseUrl')}${ALREADY_HAVE_ACCOUNT}`;

    cy.url().should('eq', expectedUrl);

    // go back to page
    cy.navigateToUrl(YOUR_DETAILS);
  });

  it('renders an analytics cookies consent banner that can be accepted', () => {
    cy.checkAnalyticsCookiesConsentAndAccept();
  });

  it('renders an analytics cookies consent banner that can be rejected', () => {
    cy.rejectAnalyticsCookies();
  });

  it('should render a header with href to insurance start', () => {
    partials.header.serviceName().should('have.attr', 'href', START);
  });

  it('renders a phase banner', () => {
    cy.checkPhaseBanner();
  });

  it('renders a page title and heading', () => {
    const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
    cy.title().should('eq', expectedPageTitle);

    cy.checkText(heading(), CONTENT_STRINGS.PAGE_TITLE);
  });

  it('renders intro text', () => {
    cy.checkText(yourDetailsPage.intro(), CONTENT_STRINGS.INTRO);
  });

  it('renders `first name` label and input', () => {
    const fieldId = FIRST_NAME;
    const field = yourDetailsPage[fieldId];

    field.label().should('exist');
    cy.checkText(field.label(), FIELD_STRINGS[fieldId].LABEL);

    field.input().should('exist');
  });

  it('renders `last name` label and input', () => {
    const fieldId = LAST_NAME;
    const field = yourDetailsPage[fieldId];

    field.label().should('exist');
    cy.checkText(field.label(), FIELD_STRINGS[fieldId].LABEL);

    field.input().should('exist');
  });

  it('renders `email` label and input', () => {
    const fieldId = EMAIL;
    const field = yourDetailsPage[fieldId];

    field.label().should('exist');
    cy.checkText(field.label(), FIELD_STRINGS[fieldId].LABEL);

    field.input().should('exist');
  });

  it('renders `password` label, hint and input', () => {
    const fieldId = PASSWORD;
    const field = yourDetailsPage[fieldId];

    field.label().should('exist');
    cy.checkText(field.label(), FIELD_STRINGS[fieldId].LABEL);

    field.input().should('exist');

    cy.checkText(field.hint.intro(), FIELD_STRINGS[fieldId].HINT.INTRO);
    cy.checkText(field.hint.listItem1(), FIELD_STRINGS[fieldId].HINT.RULES[0]);
    cy.checkText(field.hint.listItem2(), FIELD_STRINGS[fieldId].HINT.RULES[1]);
    cy.checkText(field.hint.listItem3(), FIELD_STRINGS[fieldId].HINT.RULES[2]);
    cy.checkText(field.hint.listItem4(), FIELD_STRINGS[fieldId].HINT.RULES[3]);
  });

  it('renders a submit button', () => {
    submitButton().should('exist');

    cy.checkText(submitButton(), BUTTONS.CONTINUE);
  });

  it('renders a `already got an account` copy and button link', () => {
    cy.checkText(yourDetailsPage.alreadyGotAnAccountHeading(), CONTENT_STRINGS.ALREADY_GOT_AN_ACCOUNT);

    cy.checkText(yourDetailsPage.signInButtonLink(), BUTTONS.SIGN_IN);

    yourDetailsPage.signInButtonLink().should('have.attr', 'href', SIGN_IN.ROOT);
  });

  describe('when clicking `already got an account`', () => {
    it(`should go to ${SIGN_IN.ROOT}`, () => {
      yourDetailsPage.signInButtonLink().click();

      const expectedUrl = `${Cypress.config('baseUrl')}${SIGN_IN.ROOT}`;

      cy.url().should('eq', expectedUrl);
    });
  });

  describe('form submission with all valid required fields', () => {
    before(() => {
      // go back page
      cy.go('back');
    });

    it(`should redirect to ${CONFIRM_EMAIL}`, () => {
      yourDetailsPage[FIRST_NAME].input().type(account[FIRST_NAME], { delay: 0 });
      yourDetailsPage[LAST_NAME].input().type(account[LAST_NAME], { delay: 0 });
      yourDetailsPage[EMAIL].input().type(account[EMAIL], { delay: 0 });
      yourDetailsPage[PASSWORD].input().type(account[PASSWORD], { delay: 0 });

      submitButton().click();

      const expected = `${Cypress.config('baseUrl')}${CONFIRM_EMAIL}`;
      cy.url().should('eq', expected);
    });
  });
});
