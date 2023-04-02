import partials from '../../e2e/partials';

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.declarationsAndSubmit;

// runs through the full declarations journey
export default () => {
  task.link().click();

  cy.completeAndSubmitDeclarationConfidentiality();
  cy.completeAndSubmitDeclarationAntiBribery();
  cy.completeAndSubmitDeclarationAntiBriberyCodeOfConduct();
  cy.completeAndSubmitDeclarationAntiBriberyExportingWithCodeOfConduct();
  cy.completeAndSubmitDeclarationConfirmationAndAcknowledgements();
  // cy.completeAndSubmitDeclarationHowYourDataWillBeUsed();
};
