import { status, summaryList } from '../../../../../../../../pages/shared';
import partials from '../../../../../../../../partials';
import FIELD_IDS from '../../../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../../../constants/routes/insurance';
import checkSummaryList from '../../../../../../../../commands/insurance/check-export-contract-summary-list';

const {
  ROOT,
  CHECK_YOUR_ANSWERS: {
    EXPORT_CONTRACT,
  },
  EXPORT_CONTRACT: {
    AGENT_CHECK_AND_CHANGE,
    AGENT_DETAILS_CHECK_AND_CHANGE,
    AGENT_SERVICE_CHECK_AND_CHANGE,
  },
} = INSURANCE_ROUTES;

const {
  USING_AGENT: FIELD_ID,
  AGENT_DETAILS: { NAME, FULL_ADDRESS, COUNTRY_CODE },
  AGENT_SERVICE: { SERVICE_DESCRIPTION, IS_CHARGING },
} = FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Change your answers - Export contract - Summary list - Agent - No to yes', () => {
  let referenceNumber;
  let url;
  let agentDetailsUrl;
  let agentServiceUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({
        referenceNumber,
        isUsingAgent: false,
      });

      task.link().click();

      // To get past previous "Check your answers" pages
      cy.completeAndSubmitMultipleCheckYourAnswers({ count: 3 });

      url = `${baseUrl}${ROOT}/${referenceNumber}${EXPORT_CONTRACT}`;
      agentDetailsUrl = `${baseUrl}${ROOT}/${referenceNumber}${AGENT_DETAILS_CHECK_AND_CHANGE}`;
      agentServiceUrl = `${baseUrl}${ROOT}/${referenceNumber}${AGENT_SERVICE_CHECK_AND_CHANGE}`;

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
    it(`should redirect to ${AGENT_CHECK_AND_CHANGE}`, () => {
      cy.navigateToUrl(url);

      summaryList.field(FIELD_ID).changeLink().click();

      cy.assertChangeAnswersPageUrl({ referenceNumber, route: AGENT_CHECK_AND_CHANGE, fieldId: FIELD_ID });
    });
  });

  describe('after changing the answer from no to yes', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it(`should redirect to ${AGENT_DETAILS_CHECK_AND_CHANGE}, ${AGENT_SERVICE_CHECK_AND_CHANGE} and then ${EXPORT_CONTRACT} after completing (now required) agent details and service fields`, () => {
      summaryList.field(FIELD_ID).changeLink().click();

      cy.completeAndSubmitAgentForm({
        isUsingAgent: true,
      });

      let expectedUrl = `${agentDetailsUrl}#${FIELD_ID}-label`;
      cy.assertUrl(expectedUrl);

      cy.completeAndSubmitAgentDetailsForm({});

      expectedUrl = `${agentServiceUrl}#${FIELD_ID}-label`;
      cy.assertUrl(expectedUrl);

      cy.completeAndSubmitAgentServiceForm({ agentIsCharging: false });

      cy.assertChangeAnswersPageUrl({ referenceNumber, route: EXPORT_CONTRACT, fieldId: FIELD_ID });
    });

    it(`should render new answers and change links for ${FIELD_ID} and all agent details, agent service fields`, () => {
      checkSummaryList[FIELD_ID]({ isYes: true });
      checkSummaryList[NAME]({ shouldRender: true });
      checkSummaryList[FULL_ADDRESS]({ shouldRender: true });
      checkSummaryList[COUNTRY_CODE]({ shouldRender: true });
      checkSummaryList[SERVICE_DESCRIPTION]({ shouldRender: true });
      checkSummaryList[IS_CHARGING]({ shouldRender: true, isYes: false });
    });

    it('should retain a `completed` status tag', () => {
      cy.checkTaskStatusCompleted(status);
    });
  });
});
