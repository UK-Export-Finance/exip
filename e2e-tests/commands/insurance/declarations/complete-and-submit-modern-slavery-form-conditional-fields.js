/**
 * completeAndSubmitModernSlaveryFormConditionalFields
 * complete and submit the conditional "modern slavery" form fields.
 * @param {string} cannotAdhereToAllRequirements: Textarea answer
 * @param {string} offensesOrInvestigations: Textarea answer
 * @param {string} awareOfExistingSlavery: Textarea answer
 */
const completeAndSubmitModernSlaveryFormConditionalFields = ({ cannotAdhereToAllRequirements, offensesOrInvestigations, awareOfExistingSlavery }) => {
  cy.completeModernSlaveryFormConditionalFields({
    cannotAdhereToAllRequirements,
    offensesOrInvestigations,
    awareOfExistingSlavery,
  });

  cy.clickSubmitButton();
};

export default completeAndSubmitModernSlaveryFormConditionalFields;
