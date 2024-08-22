import partials from '../../../../../../../partials';
import { field as fieldSelector, summaryList, radios, autoCompleteField } from '../../../../../../../pages/shared';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../../../../../../content-strings/fields/insurance/business';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import formatCurrency from '../../../../../../../helpers/format-currency';
import { NON_STANDARD_CURRENCY_CODE, NON_STANDARD_CURRENCY_NAME } from '../../../../../../../fixtures/currencies';
import application from '../../../../../../../fixtures/application';

const {
  ROOT,
  CHECK_YOUR_ANSWERS: { YOUR_BUSINESS },
  EXPORTER_BUSINESS: { TURNOVER_CURRENCY_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

const {
  TURNOVER: { ESTIMATED_ANNUAL_TURNOVER, TURNOVER_CURRENCY_CODE },
} = INSURANCE_FIELD_IDS.EXPORTER_BUSINESS;

const { ALTERNATIVE_CURRENCY_CODE } = INSURANCE_FIELD_IDS.CURRENCY;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Check your answers - Turnover currency - Your business - Summary list', () => {
  let referenceNumber;
  let url;
  const turnoverValue = application.EXPORTER_BUSINESS[ESTIMATED_ANNUAL_TURNOVER];

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

      task.link().click();

      url = `${baseUrl}${ROOT}/${referenceNumber}${YOUR_BUSINESS}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(`${ESTIMATED_ANNUAL_TURNOVER} change currency`, () => {
    const fieldId = TURNOVER_CURRENCY_CODE;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${TURNOVER_CURRENCY_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: TURNOVER_CURRENCY_CHECK_AND_CHANGE, fieldId: TURNOVER_CURRENCY_CODE });
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.completeAndSubmitAlternativeCurrencyForm({ alternativeCurrency: true, clickAlternativeCurrencyLink: false });
      });

      it(`should redirect to ${YOUR_BUSINESS}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: YOUR_BUSINESS, fieldId });
      });

      it(`should render the new answer for ${TURNOVER_CURRENCY_CODE}`, () => {
        const expectedValue = NON_STANDARD_CURRENCY_CODE;

        cy.assertSummaryListRowValue(summaryList, fieldId, expectedValue);
      });

      it(`should render the new answer for ${ESTIMATED_ANNUAL_TURNOVER} with the changed currency`, () => {
        const currency = NON_STANDARD_CURRENCY_CODE;

        const expectedValue = formatCurrency(turnoverValue, currency);

        cy.assertSummaryListRowValue(summaryList, ESTIMATED_ANNUAL_TURNOVER, expectedValue);
      });

      it('should render the answer on the turnover currency page', () => {
        summaryList.field(fieldId).changeLink().click();

        const { option } = radios(ALTERNATIVE_CURRENCY_CODE);

        cy.assertRadioOptionIsChecked(option.input());

        const expectedValue = `${NON_STANDARD_CURRENCY_NAME} (${NON_STANDARD_CURRENCY_CODE})`;

        cy.checkTextAndValue({
          textSelector: autoCompleteField(ALTERNATIVE_CURRENCY_CODE).results(),
          expectedText: expectedValue,
          valueSelector: autoCompleteField(ALTERNATIVE_CURRENCY_CODE),
          expectedValue,
        });
      });

      it('should render the turnover legend with the alternative currency on the turnover page', () => {
        summaryList.field(ESTIMATED_ANNUAL_TURNOVER).changeLink().click();

        const field = fieldSelector(ESTIMATED_ANNUAL_TURNOVER);

        cy.assertCopyWithCurrencyName({
          expectedCopy: FIELDS.TURNOVER[ESTIMATED_ANNUAL_TURNOVER].LEGEND,
          currencyName: NON_STANDARD_CURRENCY_NAME,
          selector: field.legend(),
          withQuestionMark: true,
        });
      });
    });
  });
});
