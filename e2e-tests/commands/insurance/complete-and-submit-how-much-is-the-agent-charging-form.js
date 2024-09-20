import { field } from '../../pages/shared';
import FIELD_IDS from '../../constants/field-ids/insurance/export-contract';
import application from '../../fixtures/application';

const {
  AGENT_CHARGES: { FIXED_SUM_AMOUNT },
} = FIELD_IDS;

/**
 * completeAndSubmitHowMuchIsTheAgentChargingForm
 * Complete and submit the "How much is the agent charging" form
 * @param {String} fixedSumAmount: Fixed sum amount
 */
const completeAndSubmitHowMuchIsTheAgentChargingForm = ({ fixedSumAmount = application.EXPORT_CONTRACT.AGENT_CHARGES[FIXED_SUM_AMOUNT] }) => {
  cy.keyboardInput(field(FIXED_SUM_AMOUNT).input(), fixedSumAmount);

  cy.clickSubmitButton();
};

export default completeAndSubmitHowMuchIsTheAgentChargingForm;
