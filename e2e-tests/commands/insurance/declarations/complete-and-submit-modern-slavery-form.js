/**
 * completeAndSubmitModernSlavery
 * Complete and submit the "modern slavery" form.
 * @param {Boolean} willAdhereToAllRequirements: radio answer
 * @param {Boolean} hasNoOffensesOrInvestigations: radio answer
 * @param {Boolean} isNotAwareOfExistingSlavery: radio answer
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
