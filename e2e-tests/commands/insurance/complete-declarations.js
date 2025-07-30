/**
 * completeDeclarations
 * Runs through the full declarations journey
 * @param {boolean} hasAntiBriberyCodeOfConduct: has "anti-bribery - code of conduct"
 * @param {boolean} exportingWithCodeOfConduct: will export with "anti-bribery - exporting with code of conduct"
 * @param {boolean} willAdhereToAllRequirements: "Modern slavery - will adhere to all requirements" answer
 * @param {boolean} hasNoOffensesOrInvestigations: "Modern slavery - has no offenses or investigations" answer
 * @param {boolean} isNotAwareOfExistingSlavery: "Modern slavery - is not aware of existing slavery" answer
 * @param {string} awareOfExistingSlavery: "Modern slavery - aware of existing slavery" textarea answer
 * @param {string} cannotAdhereToAllRequirements: "Modern slavery - cannot adhere to all requirements" textarea answer
 * @param {string} offensesOrInvestigations: "Modern slavery - offenses or investigations" textarea answer
 */
const completeDeclarations = ({
  hasAntiBriberyCodeOfConduct = true,
  exportingWithCodeOfConduct = true,
  willAdhereToAllRequirements,
  hasNoOffensesOrInvestigations,
  isNotAwareOfExistingSlavery,
  awareOfExistingSlavery,
  cannotAdhereToAllRequirements,
  offensesOrInvestigations,
}) => {
  cy.clickTaskDeclarationsAndSubmit();

  cy.completeAndSubmitDeclarationConfidentiality();

  cy.completeAndSubmitDeclarationAntiBribery();

  cy.completeAndSubmitDeclarationAntiBriberyCodeOfConduct(hasAntiBriberyCodeOfConduct);

  cy.completeAndSubmitDeclarationAntiBriberyExportingWithCodeOfConduct(exportingWithCodeOfConduct);

  if (willAdhereToAllRequirements === false || hasNoOffensesOrInvestigations === false || isNotAwareOfExistingSlavery === false) {
    cy.completeModernSlaveryForm({
      willAdhereToAllRequirements,
      hasNoOffensesOrInvestigations,
      isNotAwareOfExistingSlavery,
    });

    cy.completeAndSubmitModernSlaveryFormConditionalFields({
      awareOfExistingSlavery,
      cannotAdhereToAllRequirements,
      offensesOrInvestigations,
    });
  } else {
    cy.completeAndSubmitModernSlaveryForm({
      willAdhereToAllRequirements,
      hasNoOffensesOrInvestigations,
      isNotAwareOfExistingSlavery,
    });
  }

  cy.completeAndSubmitDeclarationConfirmationAndAcknowledgements();
};

export default completeDeclarations;
