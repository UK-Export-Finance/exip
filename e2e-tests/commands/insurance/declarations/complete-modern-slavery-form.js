const completeModernSlaveryForm = ({
  willAdhereToAllRequirements = true,
  hasNoOffensesOrInvestigations = true,
  isNotAwareOfExistingSlavery = true,
  conditionalFields = {
    cannotAdhereToAllRequirements: '',
    offensesOrInvestigations: '',
    awareOfExistingSlavery: '',
  },
}) => {
  if (willAdhereToAllRequirements) {
    cy.clickYesRadioInput(0);
  }

  if (willAdhereToAllRequirements === false) {
    cy.clickNoRadioInput(0);
  }

  if (hasNoOffensesOrInvestigations) {
    cy.clickYesRadioInput(1);
  }

  if (hasNoOffensesOrInvestigations === false) {
    cy.clickNoRadioInput(1);
  }

  if (isNotAwareOfExistingSlavery) {
    cy.clickYesRadioInput(2);
  }

  if (isNotAwareOfExistingSlavery === false) {
    cy.clickNoRadioInput(2);
  }

  cy.completeModernSlaveryFormConditionalFields(conditionalFields);
};

// TODO: update other declration commands functions to have a function name

export default completeModernSlaveryForm;
