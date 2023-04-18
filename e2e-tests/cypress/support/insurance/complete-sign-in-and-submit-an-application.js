import completeSignInAndGoToApplication from './account/complete-sign-in-and-go-to-application';

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

  cy.completeAndSubmitCheckYourAnswers();

  cy.completeAndSubmitDeclarations();

  return cy.getReferenceNumber().then((referenceNumber) => referenceNumber);
};

export default completeSignInAndSubmitAnApplication;
