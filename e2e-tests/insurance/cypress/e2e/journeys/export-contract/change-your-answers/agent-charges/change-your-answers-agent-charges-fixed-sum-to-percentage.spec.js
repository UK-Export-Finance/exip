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
    FIXED_SUM_AMOUNT, CHARGE_PERCENTAGE, PAYABLE_COUNTRY_CODE,
  },
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - Change your answers - Agent charges - Fixed sum to percentage - As an Exporter, I want to be able to review my input regarding the amount an agent is charging for helping me win my export contract, So that I can be assured I am providing UKEF with the right information', () => {
  let referenceNumber;
  let checkYourAnswersUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completeExportContractSection({
        isUsingAgent: true,
        agentIsCharging: true,
        agentChargeMethodFixedSum: true,
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

  describe(FIXED_SUM_AMOUNT, () => {
    const fieldId = FIXED_SUM_AMOUNT;

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

        cy.completeAndSubmitAgentChargesForm({ percentageMethod: true });

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
      });

      it(`should render only ${CHARGE_PERCENTAGE} and ${PAYABLE_COUNTRY_CODE} fields/values`, () => {
        checkSummaryList[FIXED_SUM_AMOUNT]({ shouldRender: false });
        checkSummaryList[CHARGE_PERCENTAGE]({ shouldRender: true });
        checkSummaryList[PAYABLE_COUNTRY_CODE]({ shouldRender: true });
      });

      describe(`when going back to ${AGENT_CHARGES_CHANGE}`, () => {
        it('should have empty field `fixed sum` values', () => {
          summaryList.field(CHARGE_PERCENTAGE).changeLink().click();

          cy.assertAgentChargesFieldValues({
            percentageMethod: true,
          });
        });
      });
    });
  });
});
