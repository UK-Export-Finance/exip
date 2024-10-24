import { taskList } from '../../../../partials/insurance';

/**
 * clickTaskPolicy
 * Click the "Policy" task link
 */
const clickTaskPolicy = () => {
  const task = taskList.prepareApplication.tasks.policy;

  task.link().click();
};

export default clickTaskPolicy;
