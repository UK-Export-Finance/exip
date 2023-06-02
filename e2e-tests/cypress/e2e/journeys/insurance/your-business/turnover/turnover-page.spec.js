import { turnover } from '../../../../pages/your-business';
import partials from '../../../../partials';
import { saveAndBackButton } from '../../../../pages/shared';
import { PAGES, BUTTONS } from '../../../../../../content-strings';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/business';
import { ROUTES } from '../../../../../../constants';
import { EXPORTER_BUSINESS as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/business';
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
  EXPORTER_BUSINESS: {
    TURNOVER,
    NATURE_OF_BUSINESS,
    BROKER,
  },
} = ROUTES.INSURANCE;

const insuranceStart = ROUTES.INSURANCE.START;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.business;

context('Insurance - Your business - Turnover page - As an Exporter I want to enter the I want to enter the turnover of my business so that UKEF can have clarity on my business financial position when processing my Export Insurance Application', () => {
  let referenceNumber;
  let url;
  let brokerUrl;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitCompanyDetails();
      cy.completeAndSubmitYourContact({});
      cy.completeAndSubmitNatureOfYourBusiness();

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${TURNOVER}`;
      brokerUrl = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${BROKER}`;

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: `${ROOT}/${referenceNumber}${TURNOVER}`,
      backLink: `${ROOT}/${referenceNumber}${NATURE_OF_BUSINESS}`,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should render a header with href to insurance start', () => {
      partials.header.serviceName().should('have.attr', 'href', insuranceStart);
    });

    it('renders a heading caption', () => {
      cy.checkText(partials.headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
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

    it('should display save and go back button', () => {
      cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
    });
  });

  describe('form submission', () => {
    it(`should redirect to ${BROKER}`, () => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitTurnoverForm();

      cy.url().should('eq', brokerUrl);
    });
  });

  describe('when going back to the page', () => {
    it('should have the submitted values', () => {
      cy.navigateToUrl(url);

      cy.checkText(turnover[FINANCIAL_YEAR_END_DATE].value(), application.EXPORTER_COMPANY[FINANCIAL_YEAR_END_DATE]);
      turnover[ESTIMATED_ANNUAL_TURNOVER].input().should('have.value', application.EXPORTER_BUSINESS[ESTIMATED_ANNUAL_TURNOVER]);
      turnover[PERCENTAGE_TURNOVER].input().should('have.value', application.EXPORTER_BUSINESS[PERCENTAGE_TURNOVER]);
    });
  });
});
