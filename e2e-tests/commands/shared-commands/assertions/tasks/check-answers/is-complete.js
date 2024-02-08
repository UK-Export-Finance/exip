import insurancePartials from '../../../../../partials/insurance';

const { taskList } = insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

/**
 * Check that the "check answers" task has a "completed" status.
 */
const checkTaskCheckAnswersStatusIsComplete = () => {
  cy.checkTaskStatusCompleted(task.status());
};

export default checkTaskCheckAnswersStatusIsComplete;
