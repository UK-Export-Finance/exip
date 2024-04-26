import {
  autoCompleteField,
  field,
  status,
  summaryList,
} from '../../../../../../../pages/shared';
import { agentChargesPage } from '../../../../../../../pages/insurance/export-contract';
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
    AGENT_CHARGES,
    AGENT_SERVICE_CHECK_AND_CHANGE,
  },
} = INSURANCE_ROUTES;

const {
  AGENT_SERVICE: { IS_CHARGING: FIELD_ID },
  AGENT_CHARGES: {
    FIXED_SUM, FIXED_SUM_AMOUNT, PERCENTAGE_CHARGE, METHOD, PAYABLE_COUNTRY_CODE, PERCENTAGE,
  },
} = FIELD_IDS;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Change your answers - Export contract - Summary list - Agent service - not charging - Yes to no', () => {
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

  describe(FIELD_ID, () => {
    describe('when clicking the `change` link', () => {
      it(`should redirect to ${AGENT_SERVICE_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(FIELD_ID).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: AGENT_SERVICE_CHECK_AND_CHANGE, fieldId: FIELD_ID });
      });
    });

    describe('after changing the answer from yes to no', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should redirect to ${EXPORT_CONTRACT}`, () => {
        summaryList.field(FIELD_ID).changeLink().click();

        cy.completeAndSubmitAgentServiceForm({
          agentIsCharging: false,
        });

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: EXPORT_CONTRACT, fieldId: FIELD_ID });
      });

      it(`should render new ${FIELD_ID} answer and change link, with no other agent service charge fields`, () => {
        checkSummaryList[FIELD_ID]({ shouldRender: true, isYes: false });
        checkSummaryList[FIXED_SUM_AMOUNT]({ shouldRender: false });
        checkSummaryList[PERCENTAGE_CHARGE]({ shouldRender: false });
        checkSummaryList[PAYABLE_COUNTRY_CODE]({ shouldRender: false });
      });

      it('should retain a `completed` status tag', () => {
        cy.checkTaskStatusCompleted(status);
      });

      describe(`when changing the answer again from no to yes and going back to ${AGENT_CHARGES}`, () => {
        it('should have an empty values', () => {
          summaryList.field(FIELD_ID).changeLink().click();

          cy.completeAndSubmitAgentServiceForm({
            agentIsCharging: true,
          });

          cy.assertRadioOptionIsNotChecked(agentChargesPage[METHOD][FIXED_SUM].input());
          cy.assertRadioOptionIsNotChecked(agentChargesPage[METHOD][PERCENTAGE].input());

          cy.checkValue(field(FIXED_SUM_AMOUNT), '');
          cy.checkValue(field(PERCENTAGE_CHARGE), '');
          cy.checkValue(autoCompleteField(PAYABLE_COUNTRY_CODE), '');
        });
      });
    });
  });
});
