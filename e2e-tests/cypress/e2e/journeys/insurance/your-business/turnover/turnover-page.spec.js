import { turnover } from '../../../../pages/your-business';
import partials from '../../../../partials';
import { heading, submitButton, saveAndBackButton } from '../../../../pages/shared';
import { PAGES, BUTTONS, LINKS } from '../../../../../../content-strings';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/exporter-business';
import { ROUTES } from '../../../../../../constants';
import { EXPORTER_BUSINESS as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/exporter-business';
import application from '../../../../../fixtures/application';

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORTER_BUSINESS.TURNOVER;

const {
  TURNOVER: {
    FINANCIAL_YEAR_END_DATE,
    ESTIMATED_ANNUAL_TURNOVER,
    PERCENTAGE_TURNOVER,
  },
} = FIELD_IDS;

const {
  ROOT,
  START,
  EXPORTER_BUSINESS: {
    TURNOVER,
    BROKER,
  },
} = ROUTES.INSURANCE;

const insuranceStart = ROUTES.INSURANCE.START;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.exporterBusiness;

context('Insurance - Your business - Turnover page - As an Exporter I want to enter the I want to enter the turnover of my business so that UKEF can have clarity on my business financial position when processing my Export Insurance Application', () => {
  let referenceNumber;
  let brokerUrl;

  before(() => {
    cy.navigateToUrl(START);

    cy.submitInsuranceEligibilityAndStartApplication();

    task.link().click();

    cy.completeAndSubmitCompanyDetails();
    cy.completeAndSubmitNatureOfYourBusiness();

    cy.getReferenceNumber().then((id) => {
      referenceNumber = id;

      const url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${TURNOVER}`;
      brokerUrl = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${BROKER}`;

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it('passes the audits', () => {
    cy.lighthouse({
      accessibility: 100,
      performance: 75,
      'best-practices': 93,
      seo: 70,
    });
  });

  it('renders a phase banner', () => {
    cy.checkPhaseBanner();
  });

  it('should render a header with href to insurance start', () => {
    partials.header.serviceName().should('have.attr', 'href', insuranceStart);
  });

  it('renders an analytics cookies consent banner that can be accepted', () => {
    cy.checkAnalyticsCookiesConsentAndAccept();
  });

  it('renders an analytics cookies consent banner that can be rejected', () => {
    cy.rejectAnalyticsCookies();
  });

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');
    cy.checkText(partials.backLink(), LINKS.BACK);
  });

  it('should display the headings correctly', () => {
    cy.checkText(partials.headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);

    cy.checkText(heading(), CONTENT_STRINGS.PAGE_TITLE);
  });

  it(`should display ${FINANCIAL_YEAR_END_DATE} section`, () => {
    const fieldId = FINANCIAL_YEAR_END_DATE;
    const field = turnover[fieldId];

    field.value().should('exist');
    cy.checkText(field.value(), application.EXPORTER_COMPANY[fieldId]);

    cy.checkText(field.label(), FIELDS.TURNOVER[fieldId].LABEL);

    field.hint().contains(FIELDS.TURNOVER[fieldId].HINT);
  });

  it(`should display ${ESTIMATED_ANNUAL_TURNOVER} section`, () => {
    const fieldId = ESTIMATED_ANNUAL_TURNOVER;
    const field = turnover[fieldId];

    field.input().should('exist');

    cy.checkText(field.heading(), FIELDS.TURNOVER[fieldId].HEADING);

    cy.checkText(field.label(), FIELDS.TURNOVER[fieldId].LABEL);

    cy.checkText(field.prefix(), FIELDS.TURNOVER[fieldId].PREFIX);
  });

  it(`should display ${PERCENTAGE_TURNOVER} section`, () => {
    const fieldId = PERCENTAGE_TURNOVER;
    const field = turnover[fieldId];

    field.input().should('exist');

    cy.checkText(field.label(), FIELDS.TURNOVER[fieldId].LABEL);

    cy.checkText(field.suffix(), FIELDS.TURNOVER[fieldId].SUFFIX);
  });

  it('should display the continue and save and go back button', () => {
    cy.checkText(submitButton(), BUTTONS.CONTINUE);

    cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
  });

  describe('form submission', () => {
    it(`should redirect to ${BROKER}`, () => {
      cy.completeAndSubmitTurnoverForm();

      cy.url().should('eq', brokerUrl);
    });
  });

  describe('when going back to the page', () => {
    it('should have the submitted values', () => {
      cy.navigateToUrl(`${ROOT}/${referenceNumber}${TURNOVER}`);

      cy.checkText(turnover[FINANCIAL_YEAR_END_DATE].value(), application.EXPORTER_COMPANY[FINANCIAL_YEAR_END_DATE]);
      turnover[ESTIMATED_ANNUAL_TURNOVER].input().should('have.value', application.EXPORTER_BUSINESS[ESTIMATED_ANNUAL_TURNOVER]);
      turnover[PERCENTAGE_TURNOVER].input().should('have.value', application.EXPORTER_BUSINESS[PERCENTAGE_TURNOVER]);
    });
  });
});
