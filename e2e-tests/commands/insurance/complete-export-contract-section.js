/**
 * completeExportContractSection
 * complete the export contract section
 */
const completeExportContractSection = () => {
  cy.startInsuranceExportContractSection();

  cy.completeAndSubmitAboutGoodsOrServicesForm({});
};

export default completeExportContractSection;
