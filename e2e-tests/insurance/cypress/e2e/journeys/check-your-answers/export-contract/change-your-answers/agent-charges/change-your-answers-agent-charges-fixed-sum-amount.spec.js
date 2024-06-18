import { status, summaryList } from '../../../../../../../../pages/shared';
import partials from '../../../../../../../../partials';
import FIELD_IDS from '../../../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../../../constants/routes/insurance';
import formatCurrency from '../../../../../../../../helpers/format-currency';
import application from '../../../../../../../../fixtures/application';

const {
  ROOT,
  CHECK_YOUR_ANSWERS: {
    EXPORT_CONTRACT,
  },
  EXPORT_CONTRACT: { AGENT_CHARGES_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

const {
  AGENT_CHARGES: { FIXED_SUM_AMOUNT },
} = FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const fieldId = FIXED_SUM_AMOUNT;

const baseUrl = Cypress.config('baseUrl');

context(`Insurance - Change your answers - Export contract - Summary list - Agent charges - ${FIXED_SUM_AMOUNT}`, () => {
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

      summaryList.field(fieldId).changeLink().click();

      cy.assertChangeAnswersPageUrl({ referenceNumber, route: AGENT_CHARGES_CHECK_AND_CHANGE, fieldId });
    });
  });

  describe('form submission with a new answer', () => {
    const newValueInput = application.EXPORT_CONTRACT.AGENT_CHARGES[fieldId] + 1;

    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it(`should redirect to ${EXPORT_CONTRACT}`, () => {
      summaryList.field(fieldId).changeLink().click();

      cy.completeAndSubmitAgentChargesForm({
        fixedSumMethod: true,
        fixedSumAmount: newValueInput,
      });

      cy.assertChangeAnswersPageUrl({ referenceNumber, route: EXPORT_CONTRACT, fieldId });
    });

    it('should render the new answer', () => {
      const expectedAnswer = formatCurrency(newValueInput);

      cy.assertSummaryListRowValue(summaryList, fieldId, expectedAnswer);
    });

    it('should retain a `completed` status tag', () => {
      cy.checkTaskStatusCompleted(status);
    });
  });
});
