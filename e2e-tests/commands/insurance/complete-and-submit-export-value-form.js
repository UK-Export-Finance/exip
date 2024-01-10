import { submitButton } from '../../pages/shared';

/**
 * completeAndSubmitExportValueForm
 * Complete and submit the "Export value" form
 */
const completeAndSubmitExportValueForm = () => {
  cy.completeExportValueForm();
  submitButton().click();
};

export default completeAndSubmitExportValueForm;
