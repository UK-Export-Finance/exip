/**
 * completeAgentForm
 * Complete the "Using an agent" form
 * @param {Boolean} isUsingAgent: Is using an agent to help win the export contract. Defaults to false.
 */
const completeAgentForm = ({ isUsingAgent = false }) => {
  if (isUsingAgent) {
    cy.clickYesRadioInput();
  } else {
    cy.clickNoRadioInput();
  }
};

export default completeAgentForm;
