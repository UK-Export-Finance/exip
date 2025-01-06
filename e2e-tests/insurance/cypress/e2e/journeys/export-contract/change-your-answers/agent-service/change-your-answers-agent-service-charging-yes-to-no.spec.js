import { radios, summaryList } from '../../../../../../../pages/shared';
import { agentChargesPage } from '../../../../../../../pages/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import checkSummaryList from '../../../../../../../commands/insurance/check-export-contract-summary-list';
import { GBP } from '../../../../../../../fixtures/currencies';

const {
  ROOT,
  EXPORT_CONTRACT: { CHECK_YOUR_ANSWERS, AGENT_SERVICE_CHANGE, AGENT_CHARGES, AGENT_CHARGES_CURRENCY, HOW_MUCH_THE_AGENT_IS_CHARGING },
} = INSURANCE_ROUTES;

const {
  CURRENCY: { CURRENCY_CODE },
  EXPORT_CONTRACT: {
    AGENT_SERVICE: { IS_CHARGING: FIELD_ID },
    AGENT_CHARGES: { FIXED_SUM, FIXED_SUM_AMOUNT, PERCENTAGE_CHARGE, METHOD, PAYABLE_COUNTRY_CODE, PERCENTAGE },
  },
} = INSURANCE_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Export contract - Change your answers - Agent service - charging - Yes to no - As an Exporter, I want to be able to review my input regarding whether an agent helped me win the export contract, So that I can be assured I am providing UKEF with the right information',
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

        describe(`when changing the answer again from no to yes and going back to ${AGENT_CHARGES}, ${AGENT_CHARGES_CURRENCY} and ${HOW_MUCH_THE_AGENT_IS_CHARGING}`, () => {
          it('should have empty field values', () => {
            summaryList.field(FIELD_ID).changeLink().click();

            cy.completeAndSubmitAgentServiceForm({
              agentIsCharging: true,
            });

            // assert AGENT_CHARGES field values.
            cy.assertRadioOptionIsNotChecked(agentChargesPage[METHOD][FIXED_SUM].input());
            cy.assertRadioOptionIsNotChecked(agentChargesPage[METHOD][PERCENTAGE].input());

            cy.assertEmptyFieldValue(PERCENTAGE_CHARGE);
            cy.assertEmptyAutocompleteFieldValue(PAYABLE_COUNTRY_CODE);

            cy.completeAndSubmitAgentChargesForm({ fixedSumMethod: true });

            /**
             * Assert AGENT_CHARGES_CURRENCY field values.
             * GBP radio option should be checked by default.
             */
            const { option } = radios(CURRENCY_CODE, GBP.isoCode);

            cy.assertRadioOptionIsChecked(option.input());

            cy.completeAndSubmitCurrencyForm({});

            // assert HOW_MUCH_THE_AGENT_IS_CHARGING field values.
            cy.assertEmptyFieldValue(FIXED_SUM_AMOUNT);
          });
        });
      });
    });
  },
);
