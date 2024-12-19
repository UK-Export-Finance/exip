/**
 * completeAndSubmitModernSlaveryFormConditionalFields
 * complete and submit the conditional "modern slavery" form fields.
 * @param {String} cannotAdhereToAllRequirements: Textarea answer
 * @param {String} offensesOrInvestigations: Textarea answer
 * @param {String} awareOfExistingSlavery: Textarea answer
 */
const completeModernSlaveryFormConditionalFields = ({ cannotAdhereToAllRequirements, offensesOrInvestigations, awareOfExistingSlavery }) => {
  cy.completeModernSlaveryFormConditionalFields({
    cannotAdhereToAllRequirements,
    offensesOrInvestigations,
    awareOfExistingSlavery,
  });

  cy.clickSubmitButton();
};

export default completeModernSlaveryFormConditionalFields;
