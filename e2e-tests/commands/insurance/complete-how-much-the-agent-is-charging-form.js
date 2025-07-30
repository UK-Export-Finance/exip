import { field } from '../../pages/shared';
import FIELD_IDS from '../../constants/field-ids/insurance/export-contract';
import application from '../../fixtures/application';

const {
  AGENT_CHARGES: { FIXED_SUM_AMOUNT },
} = FIELD_IDS;

/**
 * completeHowMuchTheAgentIsChargingForm
 * Complete the "How much the agent is charging" form
 * @param {string} fixedSumAmount: Fixed sum amount
 */
const completeHowMuchTheAgentIsChargingForm = ({ fixedSumAmount = application.EXPORT_CONTRACT.AGENT_CHARGES[FIXED_SUM_AMOUNT] }) => {
  cy.keyboardInput(field(FIXED_SUM_AMOUNT).input(), fixedSumAmount);
};

export default completeHowMuchTheAgentIsChargingForm;
