import { status, summaryList } from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import { FIELD_VALUES } from '../../../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import application from '../../../../../../../fixtures/application';
import formatCurrency from '../../../../../../../helpers/format-currency';

const {
  CURRENCY: {
    CURRENCY_CODE,
  },
  YOUR_BUYER: {
    TRADED_WITH_BUYER,
    OUTSTANDING_PAYMENTS,
    TOTAL_AMOUNT_OVERDUE,
    TOTAL_OUTSTANDING_PAYMENTS,
    FAILED_PAYMENTS,
  },
} = INSURANCE_FIELD_IDS;

const {
  ROOT,
  CHECK_YOUR_ANSWERS: {
    YOUR_BUYER,
  },
  YOUR_BUYER: {
    TRADED_WITH_BUYER_CHECK_AND_CHANGE,
    TRADING_HISTORY_CHECK_AND_CHANGE,
  },
} = INSURANCE_ROUTES;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Check your answers - Trading history - As an exporter, I want to change my answers to the trading history section', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

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

  describe(TRADED_WITH_BUYER, () => {
    const fieldId = TRADED_WITH_BUYER;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${TRADED_WITH_BUYER_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: TRADED_WITH_BUYER_CHECK_AND_CHANGE, fieldId });
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should redirect to ${TRADING_HISTORY_CHECK_AND_CHANGE} and then ${YOUR_BUYER} after completing (now required) ${TRADING_HISTORY_CHECK_AND_CHANGE} fields`, () => {
        summaryList.field(fieldId).changeLink().click();

        cy.completeAndSubmitTradedWithBuyerForm({ exporterHasTradedWithBuyer: true });

        cy.completeAndSubmitTradingHistoryWithBuyerForm({});

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: YOUR_BUYER, fieldId });
      });

      it('should render the new answers and retain a `completed` status tag', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, FIELD_VALUES.YES);

        cy.assertSummaryListRowValue(summaryList, OUTSTANDING_PAYMENTS, FIELD_VALUES.NO);
        cy.assertSummaryListRowValue(summaryList, FAILED_PAYMENTS, FIELD_VALUES.NO);

        cy.checkTaskStatusCompleted(status);
      });
    });
  });

  describe(`changing ${OUTSTANDING_PAYMENTS} from no to yes`, () => {
    const fieldId = OUTSTANDING_PAYMENTS;
    const currency = application.BUYER[CURRENCY_CODE];

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${TRADING_HISTORY_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: TRADING_HISTORY_CHECK_AND_CHANGE, fieldId });
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.completeAndSubmitTradingHistoryWithBuyerForm({ outstandingPayments: true });
      });

      it(`should redirect to ${YOUR_BUYER}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: YOUR_BUYER, fieldId });
      });

      it(`should render the new answer for ${OUTSTANDING_PAYMENTS}`, () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, FIELD_VALUES.YES);
      });

      it(`should render the new answer for ${TOTAL_AMOUNT_OVERDUE}`, () => {
        const row = summaryList.field(TOTAL_OUTSTANDING_PAYMENTS);
        const expected = formatCurrency(application.BUYER[TOTAL_OUTSTANDING_PAYMENTS], currency);

        row.value().contains(expected);
      });

      it(`should render the new answer for ${TOTAL_OUTSTANDING_PAYMENTS}`, () => {
        const row = summaryList.field(TOTAL_OUTSTANDING_PAYMENTS);
        const expected = formatCurrency(application.BUYER[TOTAL_OUTSTANDING_PAYMENTS], currency);

        row.value().contains(expected);
      });
    });
  });

  describe(`changing ${OUTSTANDING_PAYMENTS} from yes to no`, () => {
    const fieldId = OUTSTANDING_PAYMENTS;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${TRADING_HISTORY_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: TRADING_HISTORY_CHECK_AND_CHANGE, fieldId });
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.completeAndSubmitTradingHistoryWithBuyerForm({});
      });

      it(`should redirect to ${YOUR_BUYER}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: YOUR_BUYER, fieldId });
      });

      it(`should render the new answer for ${OUTSTANDING_PAYMENTS}`, () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, FIELD_VALUES.NO);
      });

      it(`should NOT render a value for ${TOTAL_AMOUNT_OVERDUE}`, () => {
        cy.assertSummaryListRowDoesNotExist(summaryList, TOTAL_AMOUNT_OVERDUE);
      });

      it(`should NOT render a value for ${TOTAL_OUTSTANDING_PAYMENTS}`, () => {
        cy.assertSummaryListRowDoesNotExist(summaryList, TOTAL_OUTSTANDING_PAYMENTS);
      });
    });
  });

  describe(FAILED_PAYMENTS, () => {
    const fieldId = FAILED_PAYMENTS;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${TRADING_HISTORY_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: TRADING_HISTORY_CHECK_AND_CHANGE, fieldId });
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.completeAndSubmitTradingHistoryWithBuyerForm({ failedToPay: true });
      });

      it(`should redirect to ${YOUR_BUYER}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: YOUR_BUYER, fieldId });
      });

      it(`should render the new answer for ${FAILED_PAYMENTS}`, () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, FIELD_VALUES.YES);
      });
    });
  });
});
