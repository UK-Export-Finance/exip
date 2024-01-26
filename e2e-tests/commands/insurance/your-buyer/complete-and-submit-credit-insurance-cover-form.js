const completeAndSubmitCreditInsuranceCoverForm = ({ hasHadCreditInsuranceCover = false }) => {
  cy.completeCreditInsuranceCoverForm({ hasHadCreditInsuranceCover });
  cy.clickSubmitButton();
};

export default completeAndSubmitCreditInsuranceCoverForm;
