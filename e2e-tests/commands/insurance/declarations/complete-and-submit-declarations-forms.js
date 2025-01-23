/**
 * completeAndDeclarationsForms
 * completes declarations forms up to the specified form to stop at
 * eg, when 'antiBribery' is passed, it will complete all forms up to and including 'antiBribery'
 * @param {String} stopSubmittingAfter: The final form to submit
 * @param {Boolean} hasAntiBriberyCodeOfConduct: has "anti-bribery - code of conduct"
 * @param {Boolean} exportingWithCodeOfConduct: will export with "anti-bribery - exporting with code of conduct"
 * @param {Boolean} willAdhereToAllRequirements: "Modern slavery - will adhere to all requirements" answer
 * @param {Boolean} hasNoOffensesOrInvestigations: "Modern slavery - has no offenses or investigations" answer
 * @param {Boolean} isNotAwareOfExistingSlavery: "Modern slavery - is not aware of existing slavery" answer
 * @param {String} awareOfExistingSlavery: "Modern slavery - aware of existing slavery" textarea answer
 * @param {String} cannotAdhereToAllRequirements: "Modern slavery - cannot adhere to all requirements" textarea answer
 * @param {String} offensesOrInvestigations: "Modern slavery - offenses or investigations" textarea answer
 */
const completeAndSubmitDeclarationsForms = ({
  stopSubmittingAfter,
  hasAntiBriberyCodeOfConduct,
  exportingWithCodeOfConduct,
  willAdhereToAllRequirements,
  hasNoOffensesOrInvestigations,
  isNotAwareOfExistingSlavery,
  awareOfExistingSlavery,
  cannotAdhereToAllRequirements,
  offensesOrInvestigations,
}) => {
  cy.completeAndSubmitCheckYourAnswers();

  cy.clickTaskDeclarationsAndSubmit();

  const steps = [
    { name: 'confidentiality', action: () => cy.completeAndSubmitDeclarationConfidentiality() },
    { name: 'antiBribery', action: () => cy.completeAndSubmitDeclarationAntiBribery() },
    { name: 'codeOfConduct', action: () => cy.completeAndSubmitDeclarationAntiBriberyCodeOfConduct(hasAntiBriberyCodeOfConduct) },
    { name: 'exportingWithCodeOfConduct', action: () => cy.completeAndSubmitDeclarationAntiBriberyExportingWithCodeOfConduct(exportingWithCodeOfConduct) },
  ];

  if (willAdhereToAllRequirements === false || hasNoOffensesOrInvestigations === false || isNotAwareOfExistingSlavery === false) {
    steps.push({
      name: 'modernSlavery',
      action: () =>
        cy.completeModernSlaveryForm({
          willAdhereToAllRequirements,
          hasNoOffensesOrInvestigations,
          isNotAwareOfExistingSlavery,
        }),
    });

    steps.push({
      name: 'modernSlaveryConditionalFields',
      action: () =>
        cy.completeAndSubmitModernSlaveryFormConditionalFields({
          awareOfExistingSlavery,
          cannotAdhereToAllRequirements,
          offensesOrInvestigations,
        }),
    });
  } else {
    steps.push({
      name: 'modernSlavery',
      action: () =>
        cy.completeAndSubmitModernSlaveryForm({
          willAdhereToAllRequirements,
          hasNoOffensesOrInvestigations,
          isNotAwareOfExistingSlavery,
        }),
    });
  }

  steps.push({
    name: 'confirmationAndAcknowledgements',
    action: () => cy.completeAndSubmitDeclarationConfirmationAndAcknowledgements(),
  });

  /**
   * carries out steps in steps array
   * if the step name matches the form to stop at, it breaks out of the loop
   */
  for (const step of steps) {
    step.action();

    if (step.name === stopSubmittingAfter) {
      break;
    }
  }
};

export default completeAndSubmitDeclarationsForms;
