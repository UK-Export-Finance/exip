import { autoCompleteField, field, status, summaryList, radios } from '../../../../../../../../pages/shared';
import { agentChargesPage } from '../../../../../../../../pages/insurance/export-contract';
import { INSURANCE_FIELD_IDS } from '../../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../../constants/routes/insurance';
import checkSummaryList from '../../../../../../../../commands/insurance/check-export-contract-summary-list';
import { GBP } from '../../../../../../../../fixtures/currencies';

const {
  ROOT,
  CHECK_YOUR_ANSWERS: { EXPORT_CONTRACT },
  EXPORT_CONTRACT: { AGENT_CHARGES, AGENT_SERVICE_CHECK_AND_CHANGE, HOW_MUCH_THE_AGENT_IS_CHARGING, AGENT_CHARGES_CURRENCY },
} = INSURANCE_ROUTES;

const {
  CURRENCY: { CURRENCY_CODE },
  EXPORT_CONTRACT: {
    AGENT_SERVICE: { IS_CHARGING: FIELD_ID },
    AGENT_CHARGES: { FIXED_SUM, FIXED_SUM_AMOUNT, PERCENTAGE_CHARGE, METHOD, PAYABLE_COUNTRY_CODE, PERCENTAGE },
  },
} = INSURANCE_FIELD_IDS;

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

      cy.clickTaskCheckAnswers();

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

      describe(`when changing the answer again from no to yes and going back to ${AGENT_CHARGES}, ${AGENT_CHARGES_CURRENCY} and ${HOW_MUCH_THE_AGENT_IS_CHARGING}`, () => {
        it('should have empty field values', () => {
          summaryList.field(FIELD_ID).changeLink().click();

          cy.completeAndSubmitAgentServiceForm({
            agentIsCharging: true,
          });

          // assert AGENT_CHARGES field values.
          cy.assertRadioOptionIsNotChecked(agentChargesPage[METHOD][FIXED_SUM].input());
          cy.assertRadioOptionIsNotChecked(agentChargesPage[METHOD][PERCENTAGE].input());

          cy.checkValue(field(PERCENTAGE_CHARGE), '');
          cy.checkValue(autoCompleteField(PAYABLE_COUNTRY_CODE), '');

          cy.completeAndSubmitAgentChargesForm({ fixedSumMethod: true });

          /**
           * Assert AGENT_CHARGES_CURRENCY field values.
           * GBP radio option should be checked by default.
           */
          const { option } = radios(CURRENCY_CODE, GBP.isoCode);

          cy.assertRadioOptionIsChecked(option.input());

          cy.completeAndSubmitAlternativeCurrencyForm({});

          // assert HOW_MUCH_THE_AGENT_IS_CHARGING field values.
          cy.checkValue(field(FIXED_SUM_AMOUNT), '');
        });
      });
    });
  });
});
