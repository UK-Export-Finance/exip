/**
 * completeAndSubmitExportValueForm
 * Complete and submit the "Export value" form
 */
const completeAndSubmitExportValueForm = () => {
  cy.completeExportValueForm();
  cy.clickSubmitButton();
};

export default completeAndSubmitExportValueForm;
