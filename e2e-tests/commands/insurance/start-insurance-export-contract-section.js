import { startNowLink } from '../../pages/shared';

/**
 * startInsuranceExportContractSection
 * Start the "export contract" section of an application.
 * 1) Click the "export contract" task list item.
 * 2) Click the "start now" link in the "export contract" start page.
 * @param {Boolean} viaTaskList: Start the "export contract" section from the task list.
 */
const startInsuranceExportContractSection = ({ viaTaskList = true }) => {
  if (viaTaskList) {
    cy.clickTaskExportContract();
  }

  startNowLink().click();
};

export default startInsuranceExportContractSection;
