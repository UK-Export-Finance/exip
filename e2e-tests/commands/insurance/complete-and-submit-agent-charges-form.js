import { autoCompleteField, field } from '../../pages/shared';
import { agentChargesPage } from '../../pages/insurance/export-contract';
import FIELD_IDS from '../../constants/field-ids/insurance/export-contract';
import { COUNTRY_APPLICATION_SUPPORT } from '../../fixtures/countries';

const {
  AGENT_CHARGES: { METHOD, FIXED_SUM, FIXED_SUM_AMOUNT, PAYABLE_COUNTRY_CODE },
} = FIELD_IDS;

/**
 * completeAndSubmitAgentChargesForm
 * Complete the "Agent charges" form
 */
const completeAndSubmitAgentChargesForm = () => {
  agentChargesPage[METHOD][FIXED_SUM].input().click();

  cy.keyboardInput(field(FIXED_SUM_AMOUNT).input(), '1234');

  cy.keyboardInput(autoCompleteField(PAYABLE_COUNTRY_CODE).input(), COUNTRY_APPLICATION_SUPPORT.ONLINE.NAME);

  cy.clickSubmitButton();
};

export default completeAndSubmitAgentChargesForm;
