import { submitButton } from '../../pages/shared';

/**
 * completeAndSubmitTotalContractValueForm
 * Complete and submit the "Total contract value" form
 * @param {Object} Object with flags completing and submitting the form
 * - policyMaximumValue: should submit an application with the maximum value of 500000
 */
const completeAndSubmitTotalContractValueForm = ({ policyMaximumValue = false }) => {
  cy.completeTotalContractValueForm({ policyMaximumValue });

  submitButton().click();
};

export default completeAndSubmitTotalContractValueForm;
