/**
 * completeAndSubmitAgentServiceForm
 * Complete and submit the "Agent service" form
 * @param {String} description: Expected service description
 * @param {Boolean} agentIsCharging: Agent is charging
 */
const completeAndSubmitAgentServiceForm = ({
  serviceDescription,
  agentIsCharging,
}) => {
  cy.completeAgentServiceForm({
    serviceDescription,
    agentIsCharging,
  });

  cy.clickSubmitButton();
};

export default completeAndSubmitAgentServiceForm;
