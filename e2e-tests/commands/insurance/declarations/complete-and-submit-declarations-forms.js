/**
 * completeAndDeclarationsForms
 * completes declarations forms up to the specified form to stop at
 * eg, when 'antiBribery' is passed, it will complete all forms before 'antiBribery'
 * @param {string} stopSubmittingAfter: The final form to submit
 * @param {boolean} hasAntiBriberyCodeOfConduct: has "anti-bribery - code of conduct"
 * @param {boolean} exportingWithCodeOfConduct: will export with "anti-bribery - exporting with code of conduct"
 * @param {boolean} willAdhereToAllRequirements: "Modern slavery - will adhere to all requirements" answer
 * @param {boolean} hasNoOffensesOrInvestigations: "Modern slavery - has no offenses or investigations" answer
 * @param {boolean} isNotAwareOfExistingSlavery: "Modern slavery - is not aware of existing slavery" answer
 * @param {string} awareOfExistingSlavery: "Modern slavery - aware of existing slavery" textarea answer
 * @param {string} cannotAdhereToAllRequirements: "Modern slavery - cannot adhere to all requirements" textarea answer
 * @param {string} offensesOrInvestigations: "Modern slavery - offenses or investigations" textarea answer
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
  cy.completePrepareApplicationSinglePolicyType({});

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
