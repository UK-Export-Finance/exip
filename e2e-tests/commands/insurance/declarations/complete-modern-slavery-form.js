/**
 * completeModernSlaveryForm
 * complete the "modern slavery" form.
 * @param {boolean} willAdhereToAllRequirements: radio answer
 * @param {boolean} hasNoOffensesOrInvestigations: radio answer
 * @param {boolean} isNotAwareOfExistingSlavery: radio answer
 */
const completeModernSlaveryForm = ({ willAdhereToAllRequirements = true, hasNoOffensesOrInvestigations = true, isNotAwareOfExistingSlavery = true }) => {
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
};

export default completeModernSlaveryForm;
