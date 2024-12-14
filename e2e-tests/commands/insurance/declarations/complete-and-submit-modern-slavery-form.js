const completeAndSubmitModernSlaveryForm = ({
  willAdhereToAllRequirements,
  hasNoOffensesOrInvestigations,
  isNotAwareOfExistingSlavery,
  conditionalFields = {
    cannotAdhereToAllRequirements: '',
    offensesOrInvestigations: '',
    awareOfExistingSlavery: '',
  },
}) => {
  cy.completeModernSlaveryForm({
    willAdhereToAllRequirements,
    hasNoOffensesOrInvestigations,
    isNotAwareOfExistingSlavery,
    conditionalFields,
  });

  cy.clickSubmitButton();
};

// TODO: update other declration commands functions to have a function name

export default completeAndSubmitModernSlaveryForm;
