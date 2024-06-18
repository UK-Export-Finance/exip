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
  EXPORT_CONTRACT: { AGENT_CHARGES_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

const {
  AGENT_CHARGES: {
    FIXED_SUM_AMOUNT, PERCENTAGE_CHARGE, PAYABLE_COUNTRY_CODE,
  },
} = FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Change your answers - Export contract - Summary list - Agent charges - Fixed sum to percentage', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({
        referenceNumber,
        isUsingAgent: true,
        agentIsCharging: true,
        agentChargeMethodFixedSum: true,
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
    it(`should redirect to ${AGENT_CHARGES_CHECK_AND_CHANGE}`, () => {
      cy.navigateToUrl(url);

      summaryList.field(FIXED_SUM_AMOUNT).changeLink().click();

      cy.assertChangeAnswersPageUrl({ referenceNumber, route: AGENT_CHARGES_CHECK_AND_CHANGE, fieldId: FIXED_SUM_AMOUNT });
    });
  });

  describe('form submission with a new answer', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it(`should redirect to ${EXPORT_CONTRACT}`, () => {
      summaryList.field(FIXED_SUM_AMOUNT).changeLink().click();

      cy.completeAndSubmitAgentChargesForm({ percentageMethod: true });

      cy.assertChangeAnswersPageUrl({ referenceNumber, route: EXPORT_CONTRACT, fieldId: FIXED_SUM_AMOUNT });
    });

    it(`should render only ${PERCENTAGE_CHARGE} and ${PAYABLE_COUNTRY_CODE} fields/values`, () => {
      checkSummaryList[FIXED_SUM_AMOUNT]({ shouldRender: false });
      checkSummaryList[PERCENTAGE_CHARGE]({ shouldRender: true });
      checkSummaryList[PAYABLE_COUNTRY_CODE]({ shouldRender: true });
    });

    it('should retain a `completed` status tag', () => {
      cy.checkTaskStatusCompleted(status);
    });
  });
});
