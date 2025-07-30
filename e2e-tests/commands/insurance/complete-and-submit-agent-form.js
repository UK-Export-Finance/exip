/**
 * completeAndSubmitAgentForm
 * Complete and submit the "Using an agent" form
 * @param {boolean} isUsingAgent: Exporter is using an agent. Defaults to false.
 */
const completeAndSubmitAgentForm = ({ isUsingAgent }) => {
  cy.completeAgentForm({ isUsingAgent });

  cy.clickSubmitButton();
};

export default completeAndSubmitAgentForm;
