import partials from '../../partials';
import { startNowLink } from '../../pages/shared';

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.policy;

/**
 * startInsurancePolicySection
 * Start the "insurance policy" section of an application.
 * 1) Click the "insurance policy" task list item.
 * 2) Click the "start now" link in the "insurance policy" start page.
 */
const startInsurancePolicySection = () => {
  task.link().click();
  startNowLink().click();
};

export default startInsurancePolicySection;
