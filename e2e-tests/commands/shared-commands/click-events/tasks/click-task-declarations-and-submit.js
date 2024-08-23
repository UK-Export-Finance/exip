import taskList from '../../../../partials/insurance/taskList';

/**
 * clickTaskDeclarationsAndSubmit
 * Click the "Declarations and submit" task link
 */
const clickTaskDeclarationsAndSubmit = () => {
  const task = taskList.submitApplication.tasks.declarationsAndSubmit;

  task.link().click();
};

export default clickTaskDeclarationsAndSubmit;
