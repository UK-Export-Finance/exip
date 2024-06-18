/**
 * completeAndSubmitCreditInsuranceCoverForm
 * completes credit insurance cover form and clicks submit button
 * @param {Boolean} hasHadCreditInsuranceCoverWithBuyer: Should select yes or no radio
 * @param {Boolean} creditInsuranceCoverDescription: Credit insurance cover description
 */
const completeAndSubmitCreditInsuranceCoverForm = ({ hasHadCreditInsuranceCoverWithBuyer, creditInsuranceCoverDescription }) => {
  cy.completeCreditInsuranceCoverForm({ hasHadCreditInsuranceCoverWithBuyer, creditInsuranceCoverDescription });

  cy.clickSubmitButton();
};

export default completeAndSubmitCreditInsuranceCoverForm;
