import { taskList } from '../../../../partials/insurance';

/**
 * clickTaskBuyer
 * Click the "Buyer" task link
 */
const clickTaskBuyer = () => {
  const task = taskList.prepareApplication.tasks.buyer;

  task.link().click();
};

export default clickTaskBuyer;
