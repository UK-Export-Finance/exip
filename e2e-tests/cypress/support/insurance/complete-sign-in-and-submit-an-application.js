import completeSignInAndGoToApplication from './account/complete-sign-in-and-go-to-application';
import partials from '../../e2e/partials';

const { taskList } = partials.insurancePartials;

/**
 * completeSignInAndSubmitAnApplication
 * 1) Complete "sign in and go to application"
 * 2) Complete and submit all "prepare your application" forms/sections
 * 3) Complete and submit all declarations forms
 * 4) Get and return the application reference number from the URL for consumption in the tests
 * @return {String} Application reference number
 */
const completeSignInAndSubmitAnApplication = () => {
  completeSignInAndGoToApplication();

  cy.completePrepareApplicationSinglePolicyType();

  // go to the page we want to test.
  taskList.submitApplication.tasks.declarations.link().click();

  cy.completeAndSubmitDeclarationConfidentiality();
  cy.completeAndSubmitDeclarationAntiBribery();
  cy.completeAndSubmitDeclarationAntiBriberyCodeOfConduct();
  cy.completeAndSubmitDeclarationAntiBriberyExportingWithCodeOfConduct();
  cy.completeAndSubmitDeclarationConfirmationAndAcknowledgements();
  cy.completeAndSubmitDeclarationHowYourDataWillBeUsed();

  return cy.getReferenceNumber().then((referenceNumber) => referenceNumber);
};
export default completeSignInAndSubmitAnApplication;
