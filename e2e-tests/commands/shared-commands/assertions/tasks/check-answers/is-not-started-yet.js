import insurancePartials from '../../../../../partials/insurance';

const { taskList } = insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

/**
 * Check that the "check answers" task has a "not started yet" status.
 */
const checkTaskCheckAnswersStatusIsNotStartedYet = () => {
  cy.checkTaskStatusNotStartedYet(task.status());
};

export default checkTaskCheckAnswersStatusIsNotStartedYet;
