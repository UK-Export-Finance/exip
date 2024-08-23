import taskList from '../../../../partials/insurance/taskList';

/**
 * clickTaskExportContract
 * Click the "Export contract" task link
 */
const clickTaskExportContract = () => {
  const task = taskList.prepareApplication.tasks.exportContract;

  task.link().click();
};

export default clickTaskExportContract;
