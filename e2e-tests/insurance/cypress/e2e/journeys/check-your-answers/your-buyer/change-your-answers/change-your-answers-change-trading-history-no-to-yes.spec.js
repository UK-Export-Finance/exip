import { status, summaryList } from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import checkSummaryList from '../../../../../../../commands/insurance/check-your-buyer-summary-list';

const {
  TRADED_WITH_BUYER,
  OUTSTANDING_PAYMENTS,
  FAILED_PAYMENTS,
  HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
  PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
} = FIELD_IDS;

const {
  ROOT,
  CHECK_YOUR_ANSWERS: {
    YOUR_BUYER,
  },
} = INSURANCE_ROUTES;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const fieldId = TRADED_WITH_BUYER;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Check your answers - Trading history - No to yes - As an exporter, I want to change my answers to the trading history section', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({
        referenceNumber,
        exporterHasTradedWithBuyer: false,
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

  it('should render the new answers', () => {
    checkSummaryList[TRADED_WITH_BUYER]({ shouldRender: true, isYes: true });
    checkSummaryList[OUTSTANDING_PAYMENTS]({ shouldRender: true, isYes: false });
    checkSummaryList[FAILED_PAYMENTS]({ shouldRender: true, isYes: false });
    checkSummaryList[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]({ shouldRender: false });
    checkSummaryList[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]({ shouldRender: false });
  });

  it('should retain a `completed` status tag', () => {
    cy.checkTaskStatusCompleted(status);
  });
});
