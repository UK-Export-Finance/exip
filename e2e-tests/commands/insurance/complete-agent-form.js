/**
 * completeAgentForm
 * Complete the "Using an agent" form
 * @param {Boolean} usingAgent: Is using an agent. Defaults to false.
 */
const completeAgentForm = ({ usingAgent = false }) => {
  if (usingAgent) {
    cy.clickYesRadioInput();
  } else {
    cy.clickNoRadioInput();
  }
};

export default completeAgentForm;
