import { status, summaryList } from '../../../../../../../pages/shared';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import checkSummaryList from '../../../../../../../commands/insurance/check-your-buyer-summary-list';

const {
  TRADED_WITH_BUYER,
  OUTSTANDING_PAYMENTS,
  PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
  FAILED_PAYMENTS,
  TOTAL_OUTSTANDING_PAYMENTS,
  TOTAL_AMOUNT_OVERDUE,
} = FIELD_IDS;

const { CURRENCY_CODE } = INSURANCE_FIELD_IDS.CURRENCY;
const {
  ROOT,
  CHECK_YOUR_ANSWERS: { YOUR_BUYER },
} = INSURANCE_ROUTES;

const fieldId = TRADED_WITH_BUYER;

const baseUrl = Cypress.config('baseUrl');

context(
  `Insurance - Check your answers - Your buyer - ${TRADED_WITH_BUYER} - No to yes - ${OUTSTANDING_PAYMENTS} as yes - As an exporter, I want to change my answers to the trading history section`,
  () => {
    let referenceNumber;
    let url;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completePrepareApplicationSinglePolicyType({
          referenceNumber,
          exporterHasTradedWithBuyer: false,
        });

        cy.clickTaskCheckAnswers();

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

    it(`should redirect to ${YOUR_BUYER}`, () => {
      summaryList.field(fieldId).changeLink().click();

      cy.completeAndSubmitTradedWithBuyerForm({ exporterHasTradedWithBuyer: true });
      cy.completeAndSubmitTradingHistoryWithBuyerForm({ outstandingPayments: true });
      cy.completeAndSubmitAlternativeCurrencyForm({});
      cy.completeAndSubmitOutstandingOrOverduePaymentsForm({});
      cy.completeAndSubmitFailedToPayForm({ failedToPay: true });

      cy.assertChangeAnswersPageUrl({ referenceNumber, route: YOUR_BUYER, fieldId });
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

    it(`should render the new answer for ${PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER}`, () => {
      checkSummaryList[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]({ shouldRender: false });
    });

    it('should retain a `completed` status tag', () => {
      cy.checkTaskStatusCompleted(status);
    });
  },
);
