import { autoCompleteField, field } from '../../pages/shared';
import FIELD_IDS from '../../constants/field-ids/insurance/export-contract';
import application from '../../fixtures/application';

const {
  AGENT_DETAILS: { NAME, FULL_ADDRESS, COUNTRY_CODE },
} = FIELD_IDS;

/**
 * completeAgentDetailsForm
 * Complete the "Agent details" form
 * @param {string} name: Agent's name
 * @param {string} fullAddress: Agent's address
 * @param {string} countryCode: Agent's country code
 */
const completeAgentDetailsForm = ({
  name = application.EXPORT_CONTRACT.AGENT_DETAILS[NAME],
  fullAddress = application.EXPORT_CONTRACT.AGENT_DETAILS[FULL_ADDRESS],
  countryCode = application.EXPORT_CONTRACT.AGENT_DETAILS[COUNTRY_CODE],
}) => {
  if (name) {
    cy.keyboardInput(field(NAME).input(), name);
  }

  if (fullAddress) {
    cy.keyboardInput(field(FULL_ADDRESS).textarea(), fullAddress);
  }

  if (countryCode) {
    cy.keyboardInput(autoCompleteField(COUNTRY_CODE).input(), countryCode);
  }
};

export default completeAgentDetailsForm;
