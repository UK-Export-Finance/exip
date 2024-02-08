import task from '.';

/**
 * Check that the "declarations and submit" task has an "in progress" status.
 */
const checkTaskDeclarationsAndSubmitStatusIsInProgress = () => {
  cy.checkTaskStatusInProgress(task.status());
};

export default checkTaskDeclarationsAndSubmitStatusIsInProgress;
