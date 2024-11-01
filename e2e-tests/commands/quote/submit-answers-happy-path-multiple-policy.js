/**
 * submitQuoteAnswersHappyPathMultiplePolicy
 * Submit all quote answers - happy path - multiple policy
 */
const submitQuoteAnswersHappyPathMultiplePolicy = () => {
  cy.completeAndSubmitBuyerCountryForm({});
  cy.completeAndSubmitBuyerBodyForm();
  cy.completeAndSubmitExporterLocationForm();
  cy.completeAndSubmitUkContentForm();
  cy.completeAndSubmitPolicyTypeMultiForm();
  cy.completeAndSubmitTellUsAboutYourMultiPolicyForm();
};

export default submitQuoteAnswersHappyPathMultiplePolicy;
