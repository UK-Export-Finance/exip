import { status, summaryList } from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import application from '../../../../../../../fixtures/application';
import formatCurrency from '../../../../../../../helpers/format-currency';
import { EUR_CURRENCY_CODE, NON_STANDARD_CURRENCY_CODE, SYMBOLS } from '../../../../../../../fixtures/currencies';

const {
  CURRENCY: {
    CURRENCY_CODE,
  },
  YOUR_BUYER: {
    OUTSTANDING_PAYMENTS,
    TOTAL_AMOUNT_OVERDUE,
    TOTAL_OUTSTANDING_PAYMENTS,
  },
} = INSURANCE_FIELD_IDS;

const {
  ROOT,
  CHECK_YOUR_ANSWERS: {
    YOUR_BUYER,
  },
  YOUR_BUYER: {
    ALTERNATIVE_CURRENCY_CHECK_AND_CHANGE,
  },
} = INSURANCE_ROUTES;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Check your answers - Alternative currency - As an exporter, I want to change my answers to an alternative currency', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({
        referenceNumber,
        exporterHasTradedWithBuyer: true,
        fullyPopulatedBuyerTradingHistory: true,
      });

      task.link().click();

      // To get past "Your business" check your answers page
      cy.completeAndSubmitMultipleCheckYourAnswers({ count: 1 });

      url = `${baseUrl}${ROOT}/${referenceNumber}${YOUR_BUYER}`;

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

  describe(`changing ${CURRENCY_CODE} to ${SYMBOLS.EUR}`, () => {
    const fieldId = OUTSTANDING_PAYMENTS;
    const currencyCode = EUR_CURRENCY_CODE;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${ALTERNATIVE_CURRENCY_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();
        cy.clickProvideAlternativeCurrencyLink();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: ALTERNATIVE_CURRENCY_CHECK_AND_CHANGE });
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.completeAndSubmitAlternativeCurrencyForm({ isoCode: EUR_CURRENCY_CODE });

        // submit TRADING_HISTORY form
        cy.clickSubmitButton();
      });

      it(`should redirect to ${YOUR_BUYER}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: YOUR_BUYER });
      });

      it(`should render the new answer for ${TOTAL_AMOUNT_OVERDUE} including ${SYMBOLS.EUR}`, () => {
        const row = summaryList.field(TOTAL_OUTSTANDING_PAYMENTS);
        const expected = formatCurrency(application.BUYER[TOTAL_OUTSTANDING_PAYMENTS], currencyCode);

        cy.checkText(row.value(), expected);
      });

      it(`should render the new answer for ${TOTAL_OUTSTANDING_PAYMENTS} including ${SYMBOLS.EUR}`, () => {
        const row = summaryList.field(TOTAL_OUTSTANDING_PAYMENTS);
        const expected = formatCurrency(application.BUYER[TOTAL_OUTSTANDING_PAYMENTS], currencyCode);

        cy.checkText(row.value(), expected);
      });
    });
  });

  describe(`changing ${CURRENCY_CODE} to an alternative currency`, () => {
    const fieldId = OUTSTANDING_PAYMENTS;
    const currencyCode = NON_STANDARD_CURRENCY_CODE;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${ALTERNATIVE_CURRENCY_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();
        cy.clickProvideAlternativeCurrencyLink();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: ALTERNATIVE_CURRENCY_CHECK_AND_CHANGE });
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.completeAndSubmitAlternativeCurrencyForm({ alternativeCurrency: true });

        // submit TRADING_HISTORY form
        cy.clickSubmitButton();
      });

      it(`should redirect to ${YOUR_BUYER}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: YOUR_BUYER });
      });

      it(`should render the new answer for ${TOTAL_AMOUNT_OVERDUE}`, () => {
        const row = summaryList.field(TOTAL_OUTSTANDING_PAYMENTS);
        const expected = formatCurrency(application.BUYER[TOTAL_OUTSTANDING_PAYMENTS], currencyCode);

        cy.checkText(row.value(), expected);
      });

      it(`should render the new answer for ${TOTAL_OUTSTANDING_PAYMENTS}`, () => {
        const row = summaryList.field(TOTAL_OUTSTANDING_PAYMENTS);
        const expected = formatCurrency(application.BUYER[TOTAL_OUTSTANDING_PAYMENTS], currencyCode);

        cy.checkText(row.value(), expected);
      });

      it('should retain a `completed` status tag', () => {
        cy.checkTaskStatusCompleted(status);
      });
    });
  });
});
