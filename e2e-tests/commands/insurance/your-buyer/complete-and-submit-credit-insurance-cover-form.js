/**
 * completeAndSubmitCreditInsuranceCoverForm
 * completes credit insurance cover form and clicks submit button
 * @param {boolean} hasHadCreditInsuranceCoverWithBuyer: Should select yes or no radio
 * @param {boolean} creditInsuranceCoverDescription: Credit insurance cover description
 */
const completeAndSubmitCreditInsuranceCoverForm = ({ hasHadCreditInsuranceCoverWithBuyer, creditInsuranceCoverDescription }) => {
  cy.completeCreditInsuranceCoverForm({ hasHadCreditInsuranceCoverWithBuyer, creditInsuranceCoverDescription });

  cy.clickSubmitButton();
};

export default completeAndSubmitCreditInsuranceCoverForm;
