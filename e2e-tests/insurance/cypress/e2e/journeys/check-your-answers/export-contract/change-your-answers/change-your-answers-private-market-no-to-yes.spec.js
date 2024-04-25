import { status, summaryList } from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import checkSummaryList from '../../../../../../../commands/insurance/check-export-contract-summary-list';

const {
  ROOT,
  CHECK_YOUR_ANSWERS: {
    EXPORT_CONTRACT,
  },
  EXPORT_CONTRACT: {
    PRIVATE_MARKET_CHECK_AND_CHANGE,
    DECLINED_BY_PRIVATE_MARKET_CHECK_AND_CHANGE,
  },
} = INSURANCE_ROUTES;

const {
  PRIVATE_MARKET: { ATTEMPTED: FIELD_ID, DECLINED_DESCRIPTION },
} = FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Change your answers - Export contract - Summary list - Private market - No to yes', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({ totalContractValueOverThreshold: true }).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({
        referenceNumber,
        totalContractValueOverThreshold: true,
        attemptedPrivateMarketCover: false,
      });

      task.link().click();

      // To get past previous "Check your answers" pages
      cy.completeAndSubmitMultipleCheckYourAnswers({ count: 3 });

      url = `${baseUrl}${ROOT}/${referenceNumber}${EXPORT_CONTRACT}`;

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
    it(`should redirect to ${PRIVATE_MARKET_CHECK_AND_CHANGE}`, () => {
      cy.navigateToUrl(url);

      summaryList.field(FIELD_ID).changeLink().click();

      cy.assertChangeAnswersPageUrl({ referenceNumber, route: PRIVATE_MARKET_CHECK_AND_CHANGE, fieldId: FIELD_ID });
    });
  });

  describe('after changing the answer from no to yes', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      summaryList.field(FIELD_ID).changeLink().click();

      cy.completeAndSubmitPrivateMarketForm({
        attemptedPrivateMarketCover: true,
      });
    });

    it(`should redirect to ${DECLINED_BY_PRIVATE_MARKET_CHECK_AND_CHANGE}`, () => {
      cy.assertChangeAnswersPageUrl({ referenceNumber, route: DECLINED_BY_PRIVATE_MARKET_CHECK_AND_CHANGE, fieldId: FIELD_ID });
    });

    it(`should redirect to ${EXPORT_CONTRACT} after completing (now required) ${DECLINED_BY_PRIVATE_MARKET_CHECK_AND_CHANGE} fields`, () => {
      cy.navigateToUrl(url);

      summaryList.field(FIELD_ID).changeLink().click();

      cy.completeAndSubmitPrivateMarketForm({
        attemptedPrivateMarketCover: true,
      });

      cy.completeAndSubmitDeclinedByPrivateMarketForm({});

      cy.assertChangeAnswersPageUrl({ referenceNumber, route: EXPORT_CONTRACT, fieldId: FIELD_ID });
    });

    it('should render the new answers', () => {
      checkSummaryList[FIELD_ID]({ shouldRender: true, isYes: true });
      checkSummaryList[DECLINED_DESCRIPTION]({ shouldRender: true });
    });

    it('should retain a `completed` status tag', () => {
      cy.checkTaskStatusCompleted(status);
    });
  });
});
