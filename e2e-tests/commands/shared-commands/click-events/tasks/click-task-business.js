import taskList from '../../../../partials/insurance/taskList';

/**
 * clickTaskBusiness
 * Click the "Business" task link
 */
const clickTaskBusiness = () => {
  const task = taskList.prepareApplication.tasks.business;

  task.link().click();
};

export default clickTaskBusiness;
