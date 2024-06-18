import partials from '../../partials';
import { startNowLink } from '../../pages/shared';

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.buyer;

/**
 * startInsuranceYourBuyerSection
 * Start the "your buyer" section of an application.
 * 1) Click the "your buyer" task list item.
 * 2) Click the "start now" link in the "your buyer" start page.
 * @param {Boolean} viaTaskList: Start the "your buyer" section from the task list.
 */
const startInsuranceYourBuyerSection = ({ viaTaskList = true }) => {
  if (viaTaskList) {
    task.link().click();
  }

  startNowLink().click();
};

export default startInsuranceYourBuyerSection;
