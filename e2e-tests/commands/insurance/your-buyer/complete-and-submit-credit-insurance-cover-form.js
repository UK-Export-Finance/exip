/**
 * completeAndSubmitCreditInsuranceCoverForm
 * completes credit insurance cover form and clicks submit button
 * @param {Boolean} hasHadCreditInsuranceCover - should select yes or no radio
 */
const completeAndSubmitCreditInsuranceCoverForm = ({ hasHadCreditInsuranceCover = false }) => {
  cy.completeCreditInsuranceCoverForm({ hasHadCreditInsuranceCover });
  cy.clickSubmitButton();
};

export default completeAndSubmitCreditInsuranceCoverForm;
