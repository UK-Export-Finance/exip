import { status, summaryList } from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import { FIELD_VALUES } from '../../../../../../../constants';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const { FAILED_PAYMENTS } = FIELD_IDS;

const {
  ROOT,
  CHECK_YOUR_ANSWERS: {
    YOUR_BUYER,
  },
  YOUR_BUYER: {
    TRADING_HISTORY_CHECK_AND_CHANGE,
  },
} = INSURANCE_ROUTES;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const fieldId = FAILED_PAYMENTS;

const baseUrl = Cypress.config('baseUrl');

context(`Insurance - Check your answers - Your buyer - Trading history - ${FAILED_PAYMENTS} - As an exporter, I want to change my answers to the trading history section`, () => {
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

    it('should retain a `completed` status tag', () => {
      cy.checkTaskStatusCompleted(status);
    });
  });
});
