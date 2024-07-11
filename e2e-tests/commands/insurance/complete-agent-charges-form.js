import { autoCompleteField, field } from '../../pages/shared';
import { agentChargesPage } from '../../pages/insurance/export-contract';
import FIELD_IDS from '../../constants/field-ids/insurance/export-contract';
import application from '../../fixtures/application';

const {
  AGENT_CHARGES: {
    METHOD, FIXED_SUM, FIXED_SUM_AMOUNT, PERCENTAGE, PERCENTAGE_CHARGE, PAYABLE_COUNTRY_CODE,
  },
} = FIELD_IDS;

/**
 * completeAgentChargesForm
 * Complete the "Agent charges" form
 * @param {Boolean} fixedSumMethod: Method as "Fixed sum"
 * @param {Boolean} percentageMethod: Method as "Percentage"
 * @param {String} fixedSumAmount: Fixed sum amount
 * @param {String} percentageCharge: Percentage charge
 * @param {String} payableCountry: Payable country
 */
const completeAgentChargesForm = ({
  fixedSumMethod = false,
  percentageMethod = false,
  fixedSumAmount = application.EXPORT_CONTRACT.AGENT_CHARGES[FIXED_SUM_AMOUNT],
  percentageCharge = application.EXPORT_CONTRACT.AGENT_CHARGES[PERCENTAGE_CHARGE],
  payableCountry = application.EXPORT_CONTRACT.AGENT_CHARGES[PAYABLE_COUNTRY_CODE],
}) => {
  if (fixedSumMethod) {
    agentChargesPage[METHOD][FIXED_SUM].input().click();

    if (fixedSumAmount) {
      cy.keyboardInput(field(FIXED_SUM_AMOUNT).input(), fixedSumAmount);
    }
  }

  if (percentageMethod) {
    agentChargesPage[METHOD][PERCENTAGE].input().click();

    if (percentageCharge) {
      cy.keyboardInput(field(PERCENTAGE_CHARGE).input(), percentageCharge);
    }
  }

  if (payableCountry) {
    cy.keyboardInput(autoCompleteField(PAYABLE_COUNTRY_CODE).input(), payableCountry);
  }
};

export default completeAgentChargesForm;
