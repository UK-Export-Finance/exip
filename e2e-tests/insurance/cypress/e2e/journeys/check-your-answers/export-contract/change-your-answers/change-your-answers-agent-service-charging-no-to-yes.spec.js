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
    AGENT_SERVICE_CHECK_AND_CHANGE,
    AGENT_CHARGES_CHECK_AND_CHANGE,
  },
} = INSURANCE_ROUTES;

const {
  AGENT_SERVICE: { IS_CHARGING: FIELD_ID },
  AGENT_CHARGES: {
    FIXED_SUM_AMOUNT, PERCENTAGE_CHARGE, PAYABLE_COUNTRY_CODE,
  },
} = FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Change your answers - Export contract - Summary list - Agent service - not charging - No to yes', () => {
  let referenceNumber;
  let url;
  let agentChargesUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({
        referenceNumber,
        isUsingAgent: true,
        agentIsCharging: false,
      });

      task.link().click();

      // To get past previous "Check your answers" pages
      cy.completeAndSubmitMultipleCheckYourAnswers({ count: 3 });

      url = `${baseUrl}${ROOT}/${referenceNumber}${EXPORT_CONTRACT}`;
      agentChargesUrl = `${baseUrl}${ROOT}/${referenceNumber}${AGENT_CHARGES_CHECK_AND_CHANGE}`;

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

  describe(FIELD_ID, () => {
    describe('when clicking the `change` link', () => {
      it(`should redirect to ${AGENT_SERVICE_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(FIELD_ID).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: AGENT_SERVICE_CHECK_AND_CHANGE, fieldId: FIELD_ID });
      });
    });

    describe('after changing the answer from no to yes', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should redirect to ${EXPORT_CONTRACT} after completing (now required) ${AGENT_CHARGES_CHECK_AND_CHANGE} fields`, () => {
        summaryList.field(FIELD_ID).changeLink().click();

        cy.navigateToUrl(url);

        summaryList.field(FIELD_ID).changeLink().click();

        cy.completeAndSubmitAgentServiceForm({
          agentIsCharging: true,
        });

        const expectedUrl = `${agentChargesUrl}#${FIELD_ID}-label`;
        cy.assertUrl(expectedUrl);

        cy.completeAndSubmitAgentChargesForm({
          fixedSumMethod: true,
        });

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: EXPORT_CONTRACT, fieldId: FIELD_ID });
      });

      it(`should render new ${FIELD_ID} answer and other agent charges fields`, () => {
        checkSummaryList[FIELD_ID]({ shouldRender: true, isYes: true });
        checkSummaryList[FIXED_SUM_AMOUNT]({ shouldRender: true });
        checkSummaryList[PERCENTAGE_CHARGE]({ shouldRender: false });
        checkSummaryList[PAYABLE_COUNTRY_CODE]({ shouldRender: true });
      });

      it('should retain a `completed` status tag', () => {
        cy.checkTaskStatusCompleted(status);
      });
    });
  });
});
