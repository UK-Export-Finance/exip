import { autoCompleteField, field, summaryList } from '../../../../../../../pages/shared';
import { agentChargesPage } from '../../../../../../../pages/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import checkSummaryList from '../../../../../../../commands/insurance/check-export-contract-summary-list';

const {
  ROOT,
  EXPORT_CONTRACT: {
    CHECK_YOUR_ANSWERS,
    AGENT_SERVICE_CHANGE,
    AGENT_CHARGES,
  },
} = INSURANCE_ROUTES;

const {
  AGENT_SERVICE: { IS_CHARGING: FIELD_ID },
  AGENT_CHARGES: {
    FIXED_SUM, FIXED_SUM_AMOUNT, PERCENTAGE_CHARGE, METHOD, PAYABLE_COUNTRY_CODE, PERCENTAGE,
  },
} = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - Change your answers - Agent service - charging - Yes to no - As an Exporter, I want to be able to review my input regarding whether an agent helped me win the export contract, So that I can be assured I am providing UKEF with the right information', () => {
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

  describe(FIELD_ID, () => {
    describe('when clicking the `change` link', () => {
      it(`should redirect to ${AGENT_SERVICE_CHANGE}`, () => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(FIELD_ID).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: AGENT_SERVICE_CHANGE, fieldId: FIELD_ID });
      });
    });

    describe('after changing the answer from yes to no', () => {
      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        summaryList.field(FIELD_ID).changeLink().click();

        cy.completeAndSubmitAgentServiceForm({
          agentIsCharging: false,
        });

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId: FIELD_ID });
      });

      it(`should render new ${FIELD_ID} answer and change link, with no other agent service charge fields`, () => {
        checkSummaryList[FIELD_ID]({ shouldRender: true, isYes: false });
        checkSummaryList[FIXED_SUM_AMOUNT]({ shouldRender: false });
        checkSummaryList[PERCENTAGE_CHARGE]({ shouldRender: false });
        checkSummaryList[PAYABLE_COUNTRY_CODE]({ shouldRender: false });
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
