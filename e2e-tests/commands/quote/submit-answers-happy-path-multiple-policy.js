import { completeAndSubmitBuyerCountryForm } from '../forms';

const submitAnswersHappyPathMultiplePolicy = () => {
  completeAndSubmitBuyerCountryForm();
  cy.completeAndSubmitBuyerBodyForm();
  cy.completeAndSubmitExporterLocationForm();
  cy.completeAndSubmitUkContentForm();
  cy.completeAndSubmitPolicyTypeMultiForm();
  cy.completeAndSubmitTellUsAboutYourMultiPolicyForm();
};

export default submitAnswersHappyPathMultiplePolicy;
