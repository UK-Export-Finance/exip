import { field, status, summaryList } from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import { FIELD_VALUES } from '../../../../../../../constants';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  OUTSTANDING_PAYMENTS,
  TOTAL_AMOUNT_OVERDUE,
  TOTAL_OUTSTANDING_PAYMENTS,
} = FIELD_IDS;

const {
  ROOT,
  CHECK_YOUR_ANSWERS: {
    YOUR_BUYER,
  },
  YOUR_BUYER: {
    TRADING_HISTORY,
    TRADING_HISTORY_CHECK_AND_CHANGE,
  },
} = INSURANCE_ROUTES;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const fieldId = OUTSTANDING_PAYMENTS;

const baseUrl = Cypress.config('baseUrl');

context(`Insurance - Check your answers - Trading history - ${OUTSTANDING_PAYMENTS} - Yes to no - As an exporter, I want to change my answers to the trading history section`, () => {
  let referenceNumber;
  let url;
  let tradingHistoryUrl;

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
      tradingHistoryUrl = `${baseUrl}${ROOT}/${referenceNumber}${TRADING_HISTORY}`;

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

      cy.completeAndSubmitTradingHistoryWithBuyerForm({ outstandingPayments: false });
    });

    it(`should redirect to ${YOUR_BUYER}`, () => {
      cy.assertChangeAnswersPageUrl({ referenceNumber, route: YOUR_BUYER, fieldId });
    });

    it(`should render the new answer with no ${TOTAL_AMOUNT_OVERDUE} or ${TOTAL_OUTSTANDING_PAYMENTS} rows`, () => {
      cy.assertSummaryListRowValue(summaryList, fieldId, FIELD_VALUES.NO);
      cy.assertSummaryListRowDoesNotExist(summaryList, TOTAL_AMOUNT_OVERDUE);
      cy.assertSummaryListRowDoesNotExist(summaryList, TOTAL_OUTSTANDING_PAYMENTS);
    });

    it('should retain a `completed` status tag', () => {
      cy.checkTaskStatusCompleted(status);
    });

    describe(`when going back to ${TRADING_HISTORY}`, () => {
      it(`should have the submitted 'no' value and empty ${TOTAL_AMOUNT_OVERDUE} and ${TOTAL_OUTSTANDING_PAYMENTS} values`, () => {
        cy.navigateToUrl(tradingHistoryUrl);

        cy.assertNoRadioOptionIsChecked();

        cy.clickYesRadioInput();

        cy.checkValue(field(TOTAL_AMOUNT_OVERDUE), '');
        cy.checkValue(field(TOTAL_OUTSTANDING_PAYMENTS), '');
      });
    });
  });
});
