import {
  heading, submitButton, tempCreateAccountButton, inlineErrorMessage, yesRadioInput, yesRadio, yesNoRadioHint, noRadio,
} from '../../../../pages/shared';
import partials from '../../../../partials';
import {
  BUTTONS,
  ERROR_MESSAGES,
  FIELDS,
  ORGANISATION,
  LINKS,
  PAGES,
} from '../../../../../../content-strings';
import { INSURANCE_FIELD_IDS as FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../constants/routes/insurance';

const {
  START,
  ELIGIBILITY: {
    ELIGIBLE_TO_APPLY_ONLINE, ALREADY_HAVE_ACCOUNT,
  },
  SIGN_IN,
} = ROUTES;

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.ALREADY_HAVE_ACCOUNT;

const FIELD_ID = FIELD_IDS.ELIGIBILITY.ALREADY_HAVE_ACCOUNT;

context('Insurance - Eligibility - Already have account page - I want to confirm that I have an account for UKEF digital servicel so that I can get guidance on how to sign in to my digital account that I can use for UKEF Export Insurance Applications', () => {
  before(() => {
    cy.navigateToUrl(START);

    cy.submitInsuranceEligibilityAnswersHappyPath();

    tempCreateAccountButton().click();

    const expected = `${Cypress.config('baseUrl')}${ALREADY_HAVE_ACCOUNT}`;

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

    const expectedUrl = `${Cypress.config('baseUrl')}${ELIGIBLE_TO_APPLY_ONLINE}`;

    cy.url().should('eq', expectedUrl);

    // go back to page
    cy.navigateToUrl(ALREADY_HAVE_ACCOUNT);
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

  it('renders yes and no radio buttons with a hint', () => {
    yesRadio().should('exist');

    cy.checkText(yesRadio(), 'Yes');

    noRadio().should('exist');

    cy.checkText(noRadio(), 'No');

    cy.checkText(yesNoRadioHint(), FIELDS[FIELD_ID].HINT);
  });

  it('renders a submit button', () => {
    submitButton().should('exist');

    cy.checkText(submitButton(), BUTTONS.CONTINUE);
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      it('should render validation errors', () => {
        submitButton().click();

        partials.errorSummaryListItems().should('exist');
        partials.errorSummaryListItems().should('have.length', 1);

        const expectedMessage = ERROR_MESSAGES.INSURANCE.ELIGIBILITY[FIELD_ID].IS_EMPTY;

        cy.checkText(partials.errorSummaryListItems().first(), expectedMessage);

        cy.checkText(inlineErrorMessage(), `Error: ${expectedMessage}`);
      });

      it('should focus on input when clicking summary error message', () => {
        submitButton().click();

        partials.errorSummaryListItemLinks().eq(0).click();
        yesRadioInput().should('have.focus');
      });
    });

    describe('when submitting the answer as `yes`', () => {
      it(`should redirect to ${SIGN_IN.ROOT}`, () => {
        yesRadioInput().click();
        submitButton().click();

        cy.url().then((url) => {
          const expected = `${Cypress.config('baseUrl')}${SIGN_IN.ROOT}`;
          cy.url().should('eq', expected);
        });
      });
    });
  });
});
