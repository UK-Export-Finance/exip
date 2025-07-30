/**
 * completeAndSubmitAgentServiceForm
 * Complete and submit the "Agent service" form
 * @param {string} description: Expected service description
 * @param {boolean} agentIsCharging: Agent is charging
 */
const completeAndSubmitAgentServiceForm = ({ serviceDescription, agentIsCharging }) => {
  cy.completeAgentServiceForm({
    serviceDescription,
    agentIsCharging,
  });

  cy.clickSubmitButton();
};

export default completeAndSubmitAgentServiceForm;
