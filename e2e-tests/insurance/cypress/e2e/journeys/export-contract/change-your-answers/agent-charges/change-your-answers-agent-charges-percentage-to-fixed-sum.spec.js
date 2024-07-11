import { summaryList } from '../../../../../../../pages/shared';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import checkSummaryList from '../../../../../../../commands/insurance/check-export-contract-summary-list';

const {
  ROOT,
  EXPORT_CONTRACT: {
    CHECK_YOUR_ANSWERS,
    AGENT_CHARGES_CHANGE,
  },
} = INSURANCE_ROUTES;

const {
  AGENT_CHARGES: {
    FIXED_SUM_AMOUNT, PERCENTAGE_CHARGE, PAYABLE_COUNTRY_CODE,
  },
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - Change your answers - Agent charges - Percentage to Fixed sum - As an Exporter, I want to be able to review my input regarding the amount an agent is charging for helping me win my export contract, So that I can be assured I am providing UKEF with the right information', () => {
  let referenceNumber;
  let checkYourAnswersUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completeExportContractSection({
        isUsingAgent: true,
        agentIsCharging: true,
        agentChargeMethodPercentage: true,
      });

      checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

      cy.assertUrl(checkYourAnswersUrl);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(PERCENTAGE_CHARGE, () => {
    const fieldId = PERCENTAGE_CHARGE;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${AGENT_CHARGES_CHANGE}`, () => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: AGENT_CHARGES_CHANGE, fieldId });
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        summaryList.field(fieldId).changeLink().click();

        cy.completeAndSubmitAgentChargesForm({ fixedSumMethod: true });

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
      });

      it(`should render only ${FIXED_SUM_AMOUNT} and ${PAYABLE_COUNTRY_CODE} fields/values`, () => {
        checkSummaryList[PERCENTAGE_CHARGE]({ shouldRender: false });
        checkSummaryList[FIXED_SUM_AMOUNT]({ shouldRender: true });
        checkSummaryList[PAYABLE_COUNTRY_CODE]({ shouldRender: true });
      });

      describe(`when going back to ${AGENT_CHARGES_CHANGE}`, () => {
        it('should have empty field `fixed sum` values', () => {
          summaryList.field(FIXED_SUM_AMOUNT).changeLink().click();

          cy.assertAgentChargesFieldValues({
            fixedSumMethod: true,
          });
        });
      });
    });
  });
});
