/**
 * completeAndSubmitModernSlaveryForm
 * complete and submit the "modern slavery" form.
 * @param {Boolean} willAdhereToAllRequirements: radio answer
 * @param {Boolean} hasNoOffensesOrInvestigations: radio answer
 * @param {Boolean} isNotAwareOfExistingSlavery: radio answer
 * @param {String} conditionalFields.cannotAdhereToAllRequirements: Textarea answer
 * @param {String} conditionalFields.offensesOrInvestigations: Textarea answer
 * @param {String} conditionalFields.awareOfExistingSlavery: Textarea answer
 */
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
