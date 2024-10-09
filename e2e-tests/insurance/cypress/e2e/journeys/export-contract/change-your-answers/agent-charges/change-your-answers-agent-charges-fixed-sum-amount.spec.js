import { field, summaryList } from '../../../../../../../pages/shared';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import formatCurrency from '../../../../../../../helpers/format-currency';
import application from '../../../../../../../fixtures/application';

const {
  ROOT,
  EXPORT_CONTRACT: { CHECK_YOUR_ANSWERS, HOW_MUCH_THE_AGENT_IS_CHARGING_CHANGE },
} = INSURANCE_ROUTES;

const {
  AGENT_CHARGES: { FIXED_SUM_AMOUNT },
} = FIELD_IDS;

const fieldId = FIXED_SUM_AMOUNT;

const baseUrl = Cypress.config('baseUrl');

context(
  `Insurance - Export contract - Change your answers - Agent charges - ${FIXED_SUM_AMOUNT} - As an Exporter, I want to be able to review my input regarding the amount an agent is charging for helping me win my export contract, So that I can be assured I am providing UKEF with the right information`,
  () => {
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

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${HOW_MUCH_THE_AGENT_IS_CHARGING_CHANGE}`, () => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: HOW_MUCH_THE_AGENT_IS_CHARGING_CHANGE, fieldId });
      });
    });

    describe('form submission with a new answer', () => {
      const newValueInput = application.EXPORT_CONTRACT.AGENT_CHARGES[FIXED_SUM_AMOUNT] + 1;

      beforeEach(() => {
        cy.navigateToUrl(checkYourAnswersUrl);

        summaryList.field(fieldId).changeLink().click();

        cy.changeAnswerField({ newValueInput }, field(fieldId).input());
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
      });

      it('should render the new answer', () => {
        const expectedAnswer = formatCurrency(newValueInput);

        cy.assertSummaryListRowValue(summaryList, fieldId, expectedAnswer);
      });
    });
  },
);
