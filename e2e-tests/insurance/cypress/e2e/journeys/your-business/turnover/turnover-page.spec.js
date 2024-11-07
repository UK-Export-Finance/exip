import { headingCaption } from '../../../../../../partials';
import { field as fieldSelector } from '../../../../../../pages/shared';
import { turnoverPage } from '../../../../../../pages/your-business';
import { PAGES } from '../../../../../../content-strings';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/business';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { EXPORTER_BUSINESS as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/business';
import { formatDate } from '../../../../../../helpers/date';
import application from '../../../../../../fixtures/application';
import { GBP } from '../../../../../../fixtures/currencies';

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORTER_BUSINESS.TURNOVER;

const {
  TURNOVER: { FINANCIAL_YEAR_END_DATE, ESTIMATED_ANNUAL_TURNOVER, PERCENTAGE_TURNOVER },
} = FIELD_IDS;

const {
  ROOT,
  EXPORTER_BUSINESS: { TURNOVER_ROOT, TURNOVER_CURRENCY_ROOT, CREDIT_CONTROL },
} = INSURANCE_ROUTES;

const financialYearEnd = {
  content: FIELDS.TURNOVER[FINANCIAL_YEAR_END_DATE],
  timestamp: application.COMPANY[FINANCIAL_YEAR_END_DATE],
};

financialYearEnd.expectedValue = formatDate(financialYearEnd.timestamp, financialYearEnd.content.DATE_FORMAT);

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Your business - Turnover page - As an Exporter I want to enter the turnover of my business so that UKEF can have clarity on my business financial position when processing my Export Insurance Application',
  () => {
    let referenceNumber;
    let url;
    let creditControlUrl;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completeAndSubmitYourBusinessForms({ formToStopAt: 'turnoverCurrency' });

        url = `${baseUrl}${ROOT}/${referenceNumber}${TURNOVER_ROOT}`;
        creditControlUrl = `${baseUrl}${ROOT}/${referenceNumber}${CREDIT_CONTROL}`;

        cy.assertUrl(url);
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
        currentHref: `${ROOT}/${referenceNumber}${TURNOVER_ROOT}`,
        backLink: `${ROOT}/${referenceNumber}${TURNOVER_CURRENCY_ROOT}`,
      });
    });

    describe('page tests', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('renders a heading caption', () => {
        cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
      });

      it(`should render ${FINANCIAL_YEAR_END_DATE} section`, () => {
        const fieldId = FINANCIAL_YEAR_END_DATE;
        const field = fieldSelector(fieldId);

        cy.checkText(turnoverPage[fieldId](), financialYearEnd.expectedValue);

        cy.checkText(field.label(), financialYearEnd.content.LABEL);

        field.hint().contains(financialYearEnd.content.HINT);
      });

      it(`should render ${ESTIMATED_ANNUAL_TURNOVER} section and turnover fieldset legend with the default currency`, () => {
        const fieldId = ESTIMATED_ANNUAL_TURNOVER;
        const field = fieldSelector(fieldId);

        field.input().should('exist');

        cy.assertCopyWithCurrencyName({
          expectedCopy: FIELDS.TURNOVER[fieldId].LEGEND,
          currencyName: GBP.name,
          selector: field.legend(),
          withQuestionMark: true,
        });

        cy.assertPrefix({ fieldId, value: FIELDS.TURNOVER[fieldId].PREFIX });
      });

      it(`should render ${PERCENTAGE_TURNOVER} section`, () => {
        const fieldId = PERCENTAGE_TURNOVER;
        const field = fieldSelector(fieldId);

        field.input().should('exist');

        cy.checkText(field.label(), FIELDS.TURNOVER[fieldId].LABEL);

        cy.assertSuffix({ fieldId, value: FIELDS.TURNOVER[fieldId].SUFFIX });
      });
    });

    describe('form submission', () => {
      it(`should redirect to ${CREDIT_CONTROL}`, () => {
        cy.navigateToUrl(url);

        cy.completeAndSubmitTurnoverForm();

        cy.assertUrl(creditControlUrl);
      });
    });

    describe('when going back to the page', () => {
      it('should have the submitted values', () => {
        cy.navigateToUrl(url);

        cy.checkText(turnoverPage[FINANCIAL_YEAR_END_DATE](), financialYearEnd.expectedValue);

        cy.checkValue(fieldSelector(ESTIMATED_ANNUAL_TURNOVER), application.EXPORTER_BUSINESS[ESTIMATED_ANNUAL_TURNOVER]);

        cy.checkValue(fieldSelector(PERCENTAGE_TURNOVER), application.EXPORTER_BUSINESS[PERCENTAGE_TURNOVER]);
      });
    });
  },
);
