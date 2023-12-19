import partials from '../../partials';
import { startNowLink } from '../../pages/shared';

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.exportContract;

/**
 * startInsuranceExportContractSection
 * Start the "export contract" section of an application.
 * 1) Click the "export contract" task list item.
 * 2) Click the "start now" link in the "export contract" start page.
 */
const startInsuranceExportContractSection = () => {
  task.link().click();
  startNowLink().click();
};

export default startInsuranceExportContractSection;
