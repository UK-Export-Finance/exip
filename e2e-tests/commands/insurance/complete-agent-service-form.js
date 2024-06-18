import { field } from '../../pages/shared';
import FIELD_IDS from '../../constants/field-ids/insurance/export-contract';
import application from '../../fixtures/application';

const {
  AGENT_SERVICE: { SERVICE_DESCRIPTION },
} = FIELD_IDS;

/**
 * completeAgentServiceForm
 * Complete the "Agent service" form
 * @param {String} description: Expected service description
 * @param {Boolean} agentIsCharging: Agent is charging
 */
const completeAgentServiceForm = ({
  serviceDescription = application.EXPORT_CONTRACT.AGENT_SERVICE[SERVICE_DESCRIPTION],
  agentIsCharging = false,
}) => {
  if (serviceDescription) {
    cy.keyboardInput(field(SERVICE_DESCRIPTION).textarea(), serviceDescription);
  }

  if (agentIsCharging) {
    cy.clickYesRadioInput();
  } else {
    cy.clickNoRadioInput();
  }
};

export default completeAgentServiceForm;
