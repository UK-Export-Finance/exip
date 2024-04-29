import { status, summaryList } from '../../../../../../../../pages/shared';
import partials from '../../../../../../../../partials';
import FIELD_IDS from '../../../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../../../constants/routes/insurance';

const {
  ROOT,
  CHECK_YOUR_ANSWERS: {
    EXPORT_CONTRACT,
  },
  EXPORT_CONTRACT: {
    DECLINED_BY_PRIVATE_MARKET_CHECK_AND_CHANGE,
  },
} = INSURANCE_ROUTES;

const {
  PRIVATE_MARKET: { DECLINED_DESCRIPTION: FIELD_ID },
} = FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const getFieldVariables = (referenceNumber) => ({
  route: DECLINED_BY_PRIVATE_MARKET_CHECK_AND_CHANGE,
  checkYourAnswersRoute: EXPORT_CONTRACT,
  newValueInput: '',
  fieldId: FIELD_ID,
  referenceNumber,
  summaryList,
  changeLink: summaryList.field(FIELD_ID).changeLink,
});

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Change your answers - Export contract - Summary list - Declined description', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({ totalContractValueOverThreshold: true }).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({
        referenceNumber,
        totalContractValueOverThreshold: true,
        attemptedPrivateMarketCover: true,
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
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it(`should redirect to ${DECLINED_BY_PRIVATE_MARKET_CHECK_AND_CHANGE}`, () => {
      cy.navigateToUrl(url);

      const fieldVariables = getFieldVariables(referenceNumber);

      cy.checkChangeLinkUrl(fieldVariables, referenceNumber, FIELD_ID);
    });
  });

  describe('form submission with a new answer', () => {
    const newAnswer = 'Mock new description';

    beforeEach(() => {
      cy.navigateToUrl(url);

      summaryList.field(FIELD_ID).changeLink().click();

      cy.completeAndSubmitDeclinedByPrivateMarketForm({
        declinedDescription: newAnswer,
      });
    });

    it(`should redirect to ${EXPORT_CONTRACT}`, () => {
      cy.assertChangeAnswersPageUrl({ referenceNumber, route: EXPORT_CONTRACT, fieldId: FIELD_ID });
    });

    it('should render the new answer and retain a `completed` status tag', () => {
      cy.assertSummaryListRowValue(summaryList, FIELD_ID, newAnswer);

      cy.checkTaskStatusCompleted(status);
    });
  });
});
