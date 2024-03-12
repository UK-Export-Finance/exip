/**
 * completeAndSubmitCreditInsuranceCoverForm
 * completes credit insurance cover form and clicks submit button
 * @param {Boolean} hasHadCreditInsuranceCover: Should select yes or no radio
 * @param {Boolean} creditInsuranceCoverDescription: Credit insurance cover description
 */
const completeAndSubmitCreditInsuranceCoverForm = ({
  hasHadCreditInsuranceCover,
  creditInsuranceCoverDescription,
}) => {
  cy.completeCreditInsuranceCoverForm({ hasHadCreditInsuranceCover, creditInsuranceCoverDescription });

  cy.clickSubmitButton();
};

export default completeAndSubmitCreditInsuranceCoverForm;
