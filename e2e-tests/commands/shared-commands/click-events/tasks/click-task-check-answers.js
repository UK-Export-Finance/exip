import taskList from '../../../../partials/insurance/taskList';

/**
 * clickTaskCheckAnswers
 * Click the "Check answers" task link
 */
const clickTaskCheckAnswers = () => {
  const task = taskList.submitApplication.tasks.checkAnswers;

  task.link().click();
};

export default clickTaskCheckAnswers;