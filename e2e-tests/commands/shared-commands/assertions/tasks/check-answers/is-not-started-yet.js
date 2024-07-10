import task from '.';

/**
 * Check that the "check answers" task has a "not started yet" status.
 */
const checkTaskCheckAnswersStatusIsNotStartedYet = () => {
  cy.checkTaskStatusNotStartedYet(task.status);
};

export default checkTaskCheckAnswersStatusIsNotStartedYet;
