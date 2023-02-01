import { natureOfBusiness } from '../../../../pages/your-business';
import partials from '../../../../partials';
import { heading, submitButton, saveAndBackButton } from '../../../../pages/shared';
import { PAGES, BUTTONS, LINKS } from '../../../../../../content-strings';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/exporter-business';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';
import getReferenceNumber from '../../../../helpers/get-reference-number';
import application from '../../../../../fixtures/application';

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_YOUR_BUSINESS;

const {
  NATURE_OF_YOUR_BUSINESS: {
    GOODS_OR_SERVICES,
    YEARS_EXPORTING,
    EMPLOYEES_UK,
    EMPLOYEES_INTERNATIONAL,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const {
  ROOT,
  START,
  EXPORTER_BUSINESS: {
    TURNOVER,
    NATURE_OF_BUSINESS,
  },
} = ROUTES.INSURANCE;

const insuranceStart = ROUTES.INSURANCE.START;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.exporterBusiness;

context('Insurance - Your business - Nature of your business page - As an Exporter I want to enter the nature of my business So that UKEF can have clarity on the type of business that I do while processing my Export Insurance Application', () => {
  let referenceNumber;
  let turnoverUrl;

  before(() => {
    cy.navigateToUrl(START);

    cy.submitInsuranceEligibilityAndStartApplication();

    task.link().click();

    cy.completeAndSubmitCompanyDetails();

    getReferenceNumber().then((id) => {
      referenceNumber = id;

      const url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${NATURE_OF_BUSINESS}`;
      turnoverUrl = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${TURNOVER}`;

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

  it(`should display ${GOODS_OR_SERVICES} input box`, () => {
    const fieldId = GOODS_OR_SERVICES;
    const field = natureOfBusiness[fieldId];

    field.input().should('exist');
    cy.checkText(field.label(), FIELDS.NATURE_OF_YOUR_BUSINESS[fieldId].LABEL);

    field.hint().contains(FIELDS.NATURE_OF_YOUR_BUSINESS[fieldId].HINT);
  });

  it(`should display ${YEARS_EXPORTING} input box`, () => {
    const fieldId = YEARS_EXPORTING;
    const field = natureOfBusiness[fieldId];

    field.input().should('exist');
    cy.checkText(field.label(), FIELDS.NATURE_OF_YOUR_BUSINESS[fieldId].LABEL);

    field.hint().contains(FIELDS.NATURE_OF_YOUR_BUSINESS[fieldId].HINT);
    cy.checkText(field.suffix(), FIELDS.NATURE_OF_YOUR_BUSINESS[fieldId].SUFFIX);
  });

  it('should display the continue and save and go back button', () => {
    cy.checkText(submitButton(), BUTTONS.CONTINUE);

    cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
  });

  it(`should display ${EMPLOYEES_UK} input box`, () => {
    const fieldId = EMPLOYEES_UK;
    const field = natureOfBusiness[fieldId];

    field.input().should('exist');
    cy.checkText(field.label(), FIELDS.NATURE_OF_YOUR_BUSINESS[fieldId].LABEL);
    cy.checkText(field.heading(), FIELDS.NATURE_OF_YOUR_BUSINESS[fieldId].HEADING);
  });

  it(`should display ${EMPLOYEES_INTERNATIONAL} input box`, () => {
    const fieldId = EMPLOYEES_INTERNATIONAL;
    const field = natureOfBusiness[fieldId];

    field.input().should('exist');
    cy.checkText(field.label(), FIELDS.NATURE_OF_YOUR_BUSINESS[fieldId].LABEL);
  });

  it('should display the continue and save and go back button', () => {
    cy.checkText(submitButton(), BUTTONS.CONTINUE);

    cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
  });

  describe('form submission', () => {
    it(`should redirect to ${TURNOVER}`, () => {
      cy.completeAndSubmitNatureOfYourBusiness();

      cy.url().should('eq', turnoverUrl);
    });
  });

  describe('when going back to the page', () => {
    it('should have the submitted values', () => {
      cy.navigateToUrl(`${ROOT}/${referenceNumber}${NATURE_OF_BUSINESS}`);

      natureOfBusiness[GOODS_OR_SERVICES].input().should('have.value', application.EXPORTER_BUSINESS[GOODS_OR_SERVICES]);
      natureOfBusiness[YEARS_EXPORTING].input().should('have.value', application.EXPORTER_BUSINESS[YEARS_EXPORTING]);
      natureOfBusiness[EMPLOYEES_UK].input().should('have.value', application.EXPORTER_BUSINESS[EMPLOYEES_UK]);
      natureOfBusiness[EMPLOYEES_INTERNATIONAL].input().should('have.value', application.EXPORTER_BUSINESS[EMPLOYEES_INTERNATIONAL]);
    });
  });
});
