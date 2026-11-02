import { INSURANCE_ROUTES } from '../../constants/routes/insurance';

/**
 * completeAgentForm
 * Complete the "Using an agent" form
 * @param {boolean} isUsingAgent: Is using an agent to help win the export contract. Defaults to false.
 */
const completeAgentForm = ({ isUsingAgent = false }) => {
  cy.assertPathnameContains(INSURANCE_ROUTES.EXPORT_CONTRACT.AGENT);

  if (isUsingAgent) {
    cy.clickYesRadioInput();
  } else {
    cy.clickNoRadioInput();
  }
};

export default completeAgentForm;
