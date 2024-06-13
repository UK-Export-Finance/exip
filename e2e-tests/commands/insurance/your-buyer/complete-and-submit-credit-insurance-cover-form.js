/**
 * completeAndSubmitCreditInsuranceCoverForm
 * completes credit insurance cover form and clicks submit button
 * @param {Boolean} hasHadCreditInsuranceCoverWIthBuyer: Should select yes or no radio
 * @param {Boolean} creditInsuranceCoverDescription: Credit insurance cover description
 */
const completeAndSubmitCreditInsuranceCoverForm = ({ hasHadCreditInsuranceCoverWIthBuyer, creditInsuranceCoverDescription }) => {
  cy.completeCreditInsuranceCoverForm({ hasHadCreditInsuranceCoverWIthBuyer, creditInsuranceCoverDescription });

  cy.clickSubmitButton();
};

export default completeAndSubmitCreditInsuranceCoverForm;
