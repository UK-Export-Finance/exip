import { completeAndSubmitBuyerCountryForm } from '../forms';

const submitAnswersHappyPathSinglePolicy = () => {
  completeAndSubmitBuyerCountryForm();
  cy.completeAndSubmitBuyerBodyForm();
  cy.completeAndSubmitExporterLocationForm();
  cy.completeAndSubmitUkContentForm();
  cy.completeAndSubmitPolicyTypeSingleForm();
  cy.completeAndSubmitTellUsAboutYourSinglePolicyForm();
};

export default submitAnswersHappyPathSinglePolicy;
