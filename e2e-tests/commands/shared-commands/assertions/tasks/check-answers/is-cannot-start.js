import task from '.';

/**
 * Check that the "check answers" task has a "cannot start" status.
 */
const checkTaskCheckAnswersStatusIsCannotStart = () => {
  cy.checkTaskStatusCannotStart(task.status());
};

export default checkTaskCheckAnswersStatusIsCannotStart;
