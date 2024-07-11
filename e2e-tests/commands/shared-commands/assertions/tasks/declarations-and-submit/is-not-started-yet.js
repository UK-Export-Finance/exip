import task from '.';

/**
 * Check that the "declarations and submit" task has a "not started yet" status.
 */
const checkTaskDeclarationsAndSubmitStatusIsNotStartedYet = () => {
  cy.checkTaskStatusNotStartedYet(task.status);
};

export default checkTaskDeclarationsAndSubmitStatusIsNotStartedYet;
