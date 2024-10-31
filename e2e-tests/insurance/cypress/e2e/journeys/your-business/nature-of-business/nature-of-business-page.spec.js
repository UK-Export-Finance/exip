import { headingCaption } from '../../../../../../partials';
import { field as fieldSelector } from '../../../../../../pages/shared';
import { PAGES } from '../../../../../../content-strings';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/business';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import application from '../../../../../../fixtures/application';

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_YOUR_BUSINESS;

const {
  EXPORTER_BUSINESS: {
    NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK },
  },
} = INSURANCE_FIELD_IDS;

const {
  ROOT,
  EXPORTER_BUSINESS: { TURNOVER_CURRENCY_ROOT, NATURE_OF_BUSINESS_ROOT, COMPANY_DETAILS },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Your business - Nature of your business page - As an Exporter I want to enter the nature of my business So that UKEF can have clarity on the type of business that I do while processing my Export Insurance Application',
  () => {
    let referenceNumber;
    let turnoverCurrencyUrl;
    let natureOfBusinessUrl;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completeAndSubmitYourBusinessForms({ formToStopAt: 'companyDetails' });

        natureOfBusinessUrl = `${baseUrl}${ROOT}/${referenceNumber}${NATURE_OF_BUSINESS_ROOT}`;

        turnoverCurrencyUrl = `${baseUrl}${ROOT}/${referenceNumber}${TURNOVER_CURRENCY_ROOT}`;

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
        currentHref: `${ROOT}/${referenceNumber}${NATURE_OF_BUSINESS_ROOT}`,
        backLink: `${ROOT}/${referenceNumber}${COMPANY_DETAILS}`,
      });
    });

    describe('page tests', () => {
      beforeEach(() => {
        cy.navigateToUrl(natureOfBusinessUrl);
      });

      it('renders a heading caption', () => {
        cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
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
        cy.assertSuffix({ fieldId, value: FIELDS.NATURE_OF_YOUR_BUSINESS[fieldId].SUFFIX });
      });

      it(`should display ${EMPLOYEES_UK} label and input`, () => {
        const fieldId = EMPLOYEES_UK;
        const field = fieldSelector(fieldId);

        cy.checkText(field.label(), FIELDS.NATURE_OF_YOUR_BUSINESS[fieldId].LEGEND);
        field.input().should('exist');
      });
    });

    describe('form submission', () => {
      it(`should redirect to ${TURNOVER_CURRENCY_ROOT}`, () => {
        cy.navigateToUrl(natureOfBusinessUrl);

        cy.completeAndSubmitNatureOfYourBusiness();

        cy.assertUrl(turnoverCurrencyUrl);
      });
    });

    describe('when going back to the page', () => {
      it('should have the submitted values', () => {
        cy.navigateToUrl(natureOfBusinessUrl);

        cy.checkTextareaValue({
          fieldId: GOODS_OR_SERVICES,
          expectedValue: application.EXPORTER_BUSINESS[GOODS_OR_SERVICES],
        });

        cy.checkValue(fieldSelector(YEARS_EXPORTING), application.EXPORTER_BUSINESS[YEARS_EXPORTING]);
        cy.checkValue(fieldSelector(EMPLOYEES_UK), application.EXPORTER_BUSINESS[EMPLOYEES_UK]);
      });
    });
  },
);
