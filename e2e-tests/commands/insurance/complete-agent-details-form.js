import { autoCompleteField, field } from '../../pages/shared';
import FIELD_IDS from '../../constants/field-ids/insurance/export-contract';
import application from '../../fixtures/application';

const {
  AGENT_DETAILS: { NAME, FULL_ADDRESS, COUNTRY_CODE },
} = FIELD_IDS;

/**
 * completeAgentDetailsForm
 * Complete the "Agent details" form
 * @param {String} name: Agent's name
 * @param {String} fullAddress: Agent's address
 * @param {String} countryCode: Agent's country code
 */
const completeAgentDetailsForm = ({
  name = application.EXPORT_CONTRACT.AGENT_DETAILS[NAME],
  fullAddress = application.EXPORT_CONTRACT.AGENT_DETAILS[FULL_ADDRESS],
  countryCode = application.EXPORT_CONTRACT.AGENT_DETAILS[COUNTRY_CODE],
}) => {
  cy.keyboardInput(field(NAME).input(), name);
  cy.keyboardInput(field(FULL_ADDRESS).textarea(), fullAddress);
  cy.keyboardInput(autoCompleteField(COUNTRY_CODE).input(), countryCode);
};

export default completeAgentDetailsForm;
