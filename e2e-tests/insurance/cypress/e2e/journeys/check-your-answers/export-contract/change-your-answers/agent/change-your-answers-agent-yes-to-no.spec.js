import { status, summaryList } from '../../../../../../../../pages/shared';
import partials from '../../../../../../../../partials';
import FIELD_IDS from '../../../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../../../constants/routes/insurance';
import checkSummaryList from '../../../../../../../../commands/insurance/check-export-contract-summary-list';

const {
  ROOT,
  CHECK_YOUR_ANSWERS: { EXPORT_CONTRACT },
  EXPORT_CONTRACT: {
    AGENT_CHECK_AND_CHANGE,
    AGENT_DETAILS,
    AGENT_SERVICE,
    AGENT_CHARGES,
  },
} = INSURANCE_ROUTES;

const {
  USING_AGENT: FIELD_ID,
  AGENT_DETAILS: { NAME, FULL_ADDRESS, COUNTRY_CODE },
  AGENT_SERVICE: {
    IS_CHARGING,
    SERVICE_DESCRIPTION,
  },
} = FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Change your answers - Export contract - Summary list - Agent - Yes to no', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({
        referenceNumber,
        isUsingAgent: true,
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
    it(`should redirect to ${AGENT_CHECK_AND_CHANGE}`, () => {
      cy.navigateToUrl(url);

      summaryList.field(FIELD_ID).changeLink().click();

      cy.assertChangeAnswersPageUrl({ referenceNumber, route: AGENT_CHECK_AND_CHANGE, fieldId: FIELD_ID });
    });
  });

  describe('after changing the answer from yes to no', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it(`should redirect to ${EXPORT_CONTRACT}`, () => {
      summaryList.field(FIELD_ID).changeLink().click();

      cy.completeAndSubmitAgentForm({
        isUsingAgent: false,
      });

      cy.assertChangeAnswersPageUrl({ referenceNumber, route: EXPORT_CONTRACT, fieldId: FIELD_ID });
    });

    it(`should render new answers and change links for ${FIELD_ID} and all agent details, agent service fields`, () => {
      checkSummaryList[FIELD_ID]({ isYes: false });
      checkSummaryList[NAME]({ shouldRender: false });
      checkSummaryList[FULL_ADDRESS]({ shouldRender: false });
      checkSummaryList[COUNTRY_CODE]({ shouldRender: false });
      checkSummaryList[SERVICE_DESCRIPTION]({ shouldRender: false });
      checkSummaryList[IS_CHARGING]({ shouldRender: false });
    });

    it('should retain a `completed` status tag', () => {
      cy.checkTaskStatusCompleted(status);
    });

    describe(`when changing the answer again from no to yes and going back to ${AGENT_DETAILS}, ${AGENT_SERVICE} and ${AGENT_CHARGES}`, () => {
      it('should have empty field values and default currency prefix', () => {
        summaryList.field(FIELD_ID).changeLink().click();

        cy.completeAndSubmitAgentForm({
          isUsingAgent: true,
        });

        cy.assertEmptyAgentDetailsFieldValues();
        cy.completeAndSubmitAgentDetailsForm({});

        cy.assertEmptyAgentServiceFieldValues();
        cy.completeAndSubmitAgentServiceForm({ agentIsCharging: true });

        cy.assertEmptyAgentChargesFieldValues();
      });
    });
  });
});
