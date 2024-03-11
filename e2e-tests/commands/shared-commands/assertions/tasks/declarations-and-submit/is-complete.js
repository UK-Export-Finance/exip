import task from '.';

/**
 * Check that the "declarations and submit" task has a "completed" status.
 */
const checkTaskDeclarationsAndSubmitStatusIsComplete = () => {
  cy.checkTaskStatusCompleted(task.status);
};

export default checkTaskDeclarationsAndSubmitStatusIsComplete;
