import { YOUR_BUYER as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/your-buyer';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { summaryList } from '../../../../../../pages/shared';
import checkSummaryList from '../../../../../../commands/insurance/check-your-buyer-summary-list';

const {
  TRADED_WITH_BUYER,
  OUTSTANDING_PAYMENTS,
  HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
  PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
  FAILED_PAYMENTS,
  TOTAL_OUTSTANDING_PAYMENTS,
  TOTAL_AMOUNT_OVERDUE,
} = FIELD_IDS;

const { CURRENCY_CODE } = INSURANCE_FIELD_IDS.CURRENCY;

const {
  ROOT,
  YOUR_BUYER: { TRADING_HISTORY_CHANGE, CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const fieldId = TRADED_WITH_BUYER;

const baseUrl = Cypress.config('baseUrl');

context(
  `Insurance - Your buyer - Change your answers - ${TRADED_WITH_BUYER} - No to yes - ${OUTSTANDING_PAYMENTS} as yes - As an exporter, I want to change my answers to the trading history section`,
  () => {
    let referenceNumber;
    let url;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completeAndSubmitYourBuyerForms({ formToStopAt: 'buyerFinancialInformation', exporterHasTradedWithBuyer: false });

        url = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
      });
    });

    beforeEach(() => {
      cy.saveSession();

      cy.navigateToUrl(url);
    });

    after(() => {
      cy.deleteApplication(referenceNumber);
    });

    it(`should redirect to ${TRADING_HISTORY_CHANGE} and then ${CHECK_YOUR_ANSWERS} after completing (now required) ${TRADING_HISTORY_CHANGE} fields`, () => {
      summaryList.field(fieldId).changeLink().click();

      cy.completeAndSubmitTradedWithBuyerForm({ exporterHasTradedWithBuyer: true });
      cy.completeAndSubmitTradingHistoryWithBuyerForm({ outstandingPayments: true });
      cy.completeAndSubmitAlternativeCurrencyForm({ clickAlternativeCurrencyLink: false });
      cy.completeAndSubmitOutstandingOrOverduePaymentsForm({});
      cy.completeAndSubmitFailedToPayForm({ failedToPay: true });

      cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
    });

    it(`should render the new answer for ${TRADED_WITH_BUYER}`, () => {
      checkSummaryList[TRADED_WITH_BUYER]({ shouldRender: true, isYes: true });
    });

    it(`should render the new answer for ${OUTSTANDING_PAYMENTS}`, () => {
      checkSummaryList[OUTSTANDING_PAYMENTS]({ shouldRender: true, isYes: true });
    });

    it(`should render the new answer for ${CURRENCY_CODE}`, () => {
      checkSummaryList[CURRENCY_CODE]({ shouldRender: true });
    });

    it(`should render the new answer for ${TOTAL_AMOUNT_OVERDUE}`, () => {
      checkSummaryList[TOTAL_AMOUNT_OVERDUE]({ shouldRender: true });
    });

    it(`should render the new answer for ${TOTAL_OUTSTANDING_PAYMENTS}`, () => {
      checkSummaryList[TOTAL_OUTSTANDING_PAYMENTS]({ shouldRender: true });
    });

    it(`should render the new answer for ${FAILED_PAYMENTS}`, () => {
      checkSummaryList[FAILED_PAYMENTS]({ shouldRender: true, isYes: true });
    });

    it(`should render the new answer for ${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER}`, () => {
      checkSummaryList[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]({ shouldRender: false });
    });

    it(`should render the new answer for ${PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER}`, () => {
      checkSummaryList[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]({ shouldRender: false });
    });
  },
);
