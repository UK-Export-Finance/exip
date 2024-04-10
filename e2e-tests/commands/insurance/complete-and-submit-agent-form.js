/**
 * completeAndSubmitAgentForm
 * Complete and submit the "Using an agent" form
 * @param {Boolean} usingAgent: Exporter is using an agent. Defaults to false.
 */
const completeAndSubmitAgentForm = ({ usingAgent }) => {
  cy.completeAgentForm({ usingAgent });

  cy.clickSubmitButton();
};

export default completeAndSubmitAgentForm;
