import { status, summaryList } from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import { FIELD_VALUES } from '../../../../../../../constants';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  TRADED_WITH_BUYER,
  OUTSTANDING_PAYMENTS,
  TOTAL_AMOUNT_OVERDUE,
  TOTAL_OUTSTANDING_PAYMENTS,
  FAILED_PAYMENTS,
} = FIELD_IDS;

const {
  ROOT,
  CHECK_YOUR_ANSWERS: {
    YOUR_BUYER,
  },
  YOUR_BUYER: {
    TRADING_HISTORY,
  },
} = INSURANCE_ROUTES;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const fieldId = TRADED_WITH_BUYER;

const baseUrl = Cypress.config('baseUrl');

context(`Insurance - Check your answers - Your buyer - Trading history - ${TRADED_WITH_BUYER} - Yes to no - As an exporter, I want to change my answers to the trading history section`, () => {
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

    summaryList.field(fieldId).changeLink().click();

    cy.completeAndSubmitTradedWithBuyerForm({ exporterHasTradedWithBuyer: false });
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it(`should redirect to ${YOUR_BUYER}`, () => {
    cy.assertChangeAnswersPageUrl({ referenceNumber, route: YOUR_BUYER, fieldId });
  });

  it('should render the new answer, with no other trading history fields', () => {
    cy.assertSummaryListRowValue(summaryList, fieldId, FIELD_VALUES.NO);
    cy.assertSummaryListRowDoesNotExist(summaryList, TOTAL_OUTSTANDING_PAYMENTS);
    cy.assertSummaryListRowDoesNotExist(summaryList, FAILED_PAYMENTS);
    cy.assertSummaryListRowDoesNotExist(summaryList, TOTAL_AMOUNT_OVERDUE);
    cy.assertSummaryListRowDoesNotExist(summaryList, OUTSTANDING_PAYMENTS);
  });

  it('should retain a `completed` status tag', () => {
    cy.checkTaskStatusCompleted(status);
  });

  describe(`when changing the answer again from no to yes and going back to ${TRADING_HISTORY}`, () => {
    it('should have empty field values', () => {
      summaryList.field(fieldId).changeLink().click();

      cy.completeAndSubmitTradedWithBuyerForm({ exporterHasTradedWithBuyer: true });

      cy.assertEmptyTradingHistoryFieldValues();
    });
  });
});
