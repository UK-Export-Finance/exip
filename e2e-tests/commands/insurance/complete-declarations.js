import { FIELD_VALUES } from '../../constants';

/**
 * completeDeclarations
 * Runs through the full declarations journey
 * @param {Object} Object with flags on how to complete specific declaration forms.
 * - exportingWithCodeOfConduct: Should submit "yes" in the "exporting with code of conduct" form. Defaults to true.
 */
const completeDeclarations = ({ hasAntiBriberyCodeOfConduct = true, exportingWithCodeOfConduct = true }) => {
  cy.clickTaskDeclarationsAndSubmit();

  cy.completeAndSubmitDeclarationConfidentiality();

  cy.completeAndSubmitDeclarationAntiBribery();

  if (hasAntiBriberyCodeOfConduct) {
    cy.completeAndSubmitDeclarationAntiBriberyCodeOfConduct(FIELD_VALUES.YES);

    if (exportingWithCodeOfConduct) {
      cy.completeAndSubmitDeclarationAntiBriberyExportingWithCodeOfConduct(FIELD_VALUES.YES);
    } else {
      cy.completeAndSubmitDeclarationAntiBriberyExportingWithCodeOfConduct(FIELD_VALUES.NO);
    }
  } else {
    cy.completeAndSubmitDeclarationAntiBriberyCodeOfConduct(FIELD_VALUES.NO);
  }

  cy.completeAndSubmitDeclarationConfirmationAndAcknowledgements();
};

export default completeDeclarations;
