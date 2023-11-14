import partials from '../../partials';
import { startNowLink } from '../../pages/shared';

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.business;

/**
 * startYourBusinessSection
 * Start the "your business" section of an application.
 * 1) Click the "your business" task list item.
 * 2) Click the "start now" link in the "your business" start page.
 */
const startYourBusinessSection = () => {
  task.link().click();
  startNowLink().click();
};

export default startYourBusinessSection;
