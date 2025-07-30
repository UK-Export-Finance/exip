/**
 * completeAndSubmitModernSlaveryForm
 * Complete and submit the "modern slavery" form.
 * @param {boolean} willAdhereToAllRequirements: radio answer
 * @param {boolean} hasNoOffensesOrInvestigations: radio answer
 * @param {boolean} isNotAwareOfExistingSlavery: radio answer
 */
const completeAndSubmitModernSlaveryForm = ({ willAdhereToAllRequirements, hasNoOffensesOrInvestigations, isNotAwareOfExistingSlavery }) => {
  cy.completeModernSlaveryForm({
    willAdhereToAllRequirements,
    hasNoOffensesOrInvestigations,
    isNotAwareOfExistingSlavery,
  });

  cy.clickSubmitButton();
};

export default completeAndSubmitModernSlaveryForm;
