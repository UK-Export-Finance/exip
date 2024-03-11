import task from '.';

/**
 * Check that the "check answers" task has an "in progress" status.
 */
const checkTaskCheckAnswersStatusIsInProgress = () => {
  cy.checkTaskStatusInProgress(task.status);
};

export default checkTaskCheckAnswersStatusIsInProgress;
