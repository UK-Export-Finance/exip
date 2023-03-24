import { submitButton } from '../../e2e/pages/shared';
import partials from '../../e2e/partials';
import { FIELD_VALUES } from '../../../constants';

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
  cy.completeAndSubmitDeclarationHowYourDataWillBeUsed();
};
