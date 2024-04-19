import { autoCompleteField, field } from '../../pages/shared';
import { agentChargesPage } from '../../pages/insurance/export-contract';
import FIELD_IDS from '../../constants/field-ids/insurance/export-contract';
import application from '../../fixtures/application';

const {
  AGENT_CHARGES: {
    METHOD, FIXED_SUM, FIXED_SUM_AMOUNT, PERCENTAGE, CHARGE_PERCENTAGE, PAYABLE_COUNTRY_CODE,
  },
} = FIELD_IDS;

/**
 * completeAndSubmitAgentChargesForm
 * Complete and submit the "Agent charges" form
 * @param {Boolean} fixedSumMethod: Method as "Fixed sum"
 * @param {Boolean} percentageMethod: Method as "Percentage"
 * @param {String} fixedSumAmount: Fixed sum amount
 * @param {String} chargePercentage: Charge percentage
 * @param {String} payableCountry: Payable country
 */
const completeAndSubmitAgentChargesForm = ({
  fixedSumMethod = false,
  percentageMethod = false,
  fixedSumAmount = application.EXPORT_CONTRACT.AGENT_CHARGES[FIXED_SUM_AMOUNT],
  chargePercentage = application.EXPORT_CONTRACT.AGENT_CHARGES[CHARGE_PERCENTAGE],
  payableCountry = application.EXPORT_CONTRACT.AGENT_CHARGES[PAYABLE_COUNTRY_CODE],
}) => {
  if (fixedSumMethod) {
    agentChargesPage[METHOD][FIXED_SUM].input().click();

    cy.keyboardInput(field(FIXED_SUM_AMOUNT).input(), fixedSumAmount);
  }

  if (percentageMethod) {
    agentChargesPage[METHOD][PERCENTAGE].input().click();

    cy.keyboardInput(field(CHARGE_PERCENTAGE).input(), chargePercentage);
  }

  cy.keyboardInput(autoCompleteField(PAYABLE_COUNTRY_CODE).input(), payableCountry);

  cy.clickSubmitButton();
};

export default completeAndSubmitAgentChargesForm;
