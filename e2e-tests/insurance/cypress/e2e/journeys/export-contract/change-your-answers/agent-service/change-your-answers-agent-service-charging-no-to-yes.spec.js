import { summaryList } from '../../../../../../../pages/shared';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import checkSummaryList from '../../../../../../../commands/insurance/check-export-contract-summary-list';

const {
  ROOT,
  EXPORT_CONTRACT: {
    CHECK_YOUR_ANSWERS,
    AGENT_SERVICE_CHANGE,
    AGENT_CHARGES_CHANGE,
  },
} = INSURANCE_ROUTES;

const {
  AGENT_SERVICE: { IS_CHARGING: FIELD_ID },
  AGENT_CHARGES: {
    FIXED_SUM_AMOUNT, PERCENTAGE_CHARGE, PAYABLE_COUNTRY_CODE,
  },
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - Change your answers - Agent service - not charging - No to yes - As an Exporter, I want to be able to review my input regarding whether an agent helped me win the export contract, So that I can be assured I am providing UKEF with the right information', () => {
  let referenceNumber;
  let checkYourAnswersUrl;
  let agentChargesUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completeExportContractSection({
        isUsingAgent: true,
        agentIsCharging: false,
      });

      checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
      agentChargesUrl = `${baseUrl}${ROOT}/${referenceNumber}${AGENT_CHARGES_CHANGE}`;

      cy.assertUrl(checkYourAnswersUrl);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(FIELD_ID, () => {
    describe('when clicking the `change` link', () => {
      it(`should redirect to ${AGENT_SERVICE_CHANGE}`, () => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(FIELD_ID).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: AGENT_SERVICE_CHANGE, fieldId: FIELD_ID });
      });
    });

    describe('after changing the answer from no to yes', () => {
      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);
      });

      it(`should redirect to ${AGENT_CHARGES_CHANGE} and then ${CHECK_YOUR_ANSWERS} after completing (now required) ${AGENT_CHARGES_CHANGE} fields`, () => {
        summaryList.field(FIELD_ID).changeLink().click();

        cy.completeAndSubmitAgentServiceForm({
          agentIsCharging: true,
        });

        const expectedUrl = `${agentChargesUrl}#${FIELD_ID}-label`;
        cy.assertUrl(expectedUrl);

        cy.completeAndSubmitAgentChargesForm({
          fixedSumMethod: true,
        });

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId: FIELD_ID });
      });

      it(`should render new ${FIELD_ID} answer and other agent charges fields`, () => {
        checkSummaryList[FIELD_ID]({ shouldRender: true, isYes: true });
        checkSummaryList[FIXED_SUM_AMOUNT]({ shouldRender: true });
        checkSummaryList[PERCENTAGE_CHARGE]({ shouldRender: false });
        checkSummaryList[PAYABLE_COUNTRY_CODE]({ shouldRender: true });
      });
    });
  });
});
