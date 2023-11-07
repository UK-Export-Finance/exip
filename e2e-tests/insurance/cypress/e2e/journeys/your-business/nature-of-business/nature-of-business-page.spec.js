import partials from '../../../../../../partials';
import { field as fieldSelector, submitButton, saveAndBackButton } from '../../../../../../pages/shared';
import { PAGES, BUTTONS } from '../../../../../../content-strings';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/business';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import application from '../../../../../../fixtures/application';

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_YOUR_BUSINESS;

const {
  EXPORTER_BUSINESS: {
    NATURE_OF_YOUR_BUSINESS: {
      GOODS_OR_SERVICES,
      YEARS_EXPORTING,
      EMPLOYEES_UK,
      EMPLOYEES_INTERNATIONAL,
    },
  },
} = INSURANCE_FIELD_IDS;

const {
  ROOT,
  EXPORTER_BUSINESS: {
    TURNOVER,
    NATURE_OF_BUSINESS,
    COMPANY_DETAILS,
  },
} = INSURANCE_ROUTES;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.business;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your business - Nature of your business page - As an Exporter I want to enter the nature of my business So that UKEF can have clarity on the type of business that I do while processing my Export Insurance Application', () => {
  let referenceNumber;
  let turnoverUrl;
  let natureOfBusinessUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitCompaniesHouseSearchForm({ referenceNumber });
      cy.completeAndSubmitCompanyDetails();

      natureOfBusinessUrl = `${baseUrl}${ROOT}/${referenceNumber}${NATURE_OF_BUSINESS}`;

      turnoverUrl = `${baseUrl}${ROOT}/${referenceNumber}${TURNOVER}`;

      cy.assertUrl(natureOfBusinessUrl);
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
      currentHref: `${ROOT}/${referenceNumber}${NATURE_OF_BUSINESS}`,
      backLink: `${ROOT}/${referenceNumber}${COMPANY_DETAILS}`,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(natureOfBusinessUrl);
    });

    it('renders a heading caption', () => {
      cy.checkText(partials.headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    it(`should display ${GOODS_OR_SERVICES} label, input and hint`, () => {
      const fieldId = GOODS_OR_SERVICES;
      const field = fieldSelector(fieldId);

      field.textarea().should('exist');
      cy.checkText(field.label(), FIELDS.NATURE_OF_YOUR_BUSINESS[fieldId].LABEL);

      field.hint().contains(FIELDS.NATURE_OF_YOUR_BUSINESS[fieldId].HINT);
    });

    it(`should display ${YEARS_EXPORTING} label, input and hint`, () => {
      const fieldId = YEARS_EXPORTING;
      const field = fieldSelector(fieldId);

      field.input().should('exist');
      cy.checkText(field.label(), FIELDS.NATURE_OF_YOUR_BUSINESS[fieldId].LABEL);

      field.hint().contains(FIELDS.NATURE_OF_YOUR_BUSINESS[fieldId].HINT);
      cy.checkText(field.suffix(), FIELDS.NATURE_OF_YOUR_BUSINESS[fieldId].SUFFIX);
    });

    it('should display save and go back button', () => {
      cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
    });

    it('should display the employees fieldset legend', () => {
      const fieldId = EMPLOYEES_UK;
      const field = fieldSelector(fieldId);

      cy.checkText(field.legend(), FIELDS.NATURE_OF_YOUR_BUSINESS[fieldId].LEGEND);
    });

    it(`should display ${EMPLOYEES_UK} label and input`, () => {
      const fieldId = EMPLOYEES_UK;
      const field = fieldSelector(fieldId);

      cy.checkText(field.label(), FIELDS.NATURE_OF_YOUR_BUSINESS[fieldId].LABEL);
      field.input().should('exist');
    });

    it(`should display ${EMPLOYEES_INTERNATIONAL} label and input`, () => {
      const fieldId = EMPLOYEES_INTERNATIONAL;
      const field = fieldSelector(fieldId);

      cy.checkText(field.label(), FIELDS.NATURE_OF_YOUR_BUSINESS[fieldId].LABEL);

      field.input().should('exist');
    });

    it('should display the continue and save and go back button', () => {
      cy.checkText(submitButton(), BUTTONS.CONTINUE);

      cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
    });
  });

  describe('form submission', () => {
    it(`should redirect to ${TURNOVER}`, () => {
      cy.navigateToUrl(natureOfBusinessUrl);

      cy.completeAndSubmitNatureOfYourBusiness();

      cy.assertUrl(turnoverUrl);
    });
  });

  describe('when going back to the page', () => {
    it('should have the submitted values', () => {
      cy.navigateToUrl(natureOfBusinessUrl);

      fieldSelector(GOODS_OR_SERVICES).textarea().should('have.value', application.EXPORTER_BUSINESS[GOODS_OR_SERVICES]);
      fieldSelector(YEARS_EXPORTING).input().should('have.value', application.EXPORTER_BUSINESS[YEARS_EXPORTING]);
      fieldSelector(EMPLOYEES_UK).input().should('have.value', application.EXPORTER_BUSINESS[EMPLOYEES_UK]);
      fieldSelector(EMPLOYEES_INTERNATIONAL).input().should('have.value', application.EXPORTER_BUSINESS[EMPLOYEES_INTERNATIONAL]);
    });
  });
});
