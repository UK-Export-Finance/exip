/**
 * completeAndSubmitAgentForm
 * Complete and submit the "Using an agent" form
 * @param {Boolean} usingAgent: Is using an agent to help win the export contract. Defaults to false.
 */
const completeAndSubmitAgentForm = ({ usingAgent }) => {
  cy.completeAgentForm({ usingAgent });

  cy.clickSubmitButton();
};

export default completeAndSubmitAgentForm;
