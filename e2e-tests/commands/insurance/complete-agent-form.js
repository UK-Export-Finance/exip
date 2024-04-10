/**
 * completeAgentForm
 * Complete the "Using an agent" form
 * @param {Boolean} usingAgent: Is using an agent to help win the export contract. Defaults to false.
 */
const completeAgentForm = ({ usingAgent = false }) => {
  if (usingAgent) {
    cy.clickYesRadioInput();
  } else {
    cy.clickNoRadioInput();
  }
};

export default completeAgentForm;
