import task from '.';

/**
 * Check that the "check answers" task has a "completed" status.
 */
const checkTaskCheckAnswersStatusIsComplete = () => {
  cy.checkTaskStatusCompleted(task.status);
};

export default checkTaskCheckAnswersStatusIsComplete;
