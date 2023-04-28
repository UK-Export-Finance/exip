import partials from '../../e2e/partials';
import { FIELD_VALUES } from '../../../constants';

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.declarationsAndSubmit;

/**
 * completeDeclarations
 * Runs through the full declarations journey
 * @param {Object} Object with flags on how to complete specific declaration forms.
 * - exportingWithCodeOfConduct: Should submit "yes" in the "exporting with code of conduct" form. Defaults to "yes".
 */
const completeDeclarations = ({ exportingWithCodeOfConduct = true }) => {
  task.link().click();

  cy.completeAndSubmitDeclarationConfidentiality();

  cy.completeAndSubmitDeclarationAntiBribery();

  cy.completeAndSubmitDeclarationAntiBriberyCodeOfConduct();

  if (exportingWithCodeOfConduct) {
    cy.completeAndSubmitDeclarationAntiBriberyExportingWithCodeOfConduct(FIELD_VALUES.YES);
  } else {
    cy.completeAndSubmitDeclarationAntiBriberyExportingWithCodeOfConduct(FIELD_VALUES.NO);
  }

  cy.completeAndSubmitDeclarationConfirmationAndAcknowledgements();
  cy.completeAndSubmitDeclarationHowYourDataWillBeUsed();
};

export default completeDeclarations;
