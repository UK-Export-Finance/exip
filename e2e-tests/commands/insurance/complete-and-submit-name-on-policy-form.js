/**
 * completeAndSubmitNameOnPolicyForm
 * completes and submits name on policy form
 * @param {Boolean} sameName - if name is the same name as owner - default true
 */
const completeAndSubmitNameOnPolicyForm = ({ sameName = true }) => {
  cy.completeNameOnPolicyForm({ sameName });
  cy.clickSubmitButton();
};

export default completeAndSubmitNameOnPolicyForm;
