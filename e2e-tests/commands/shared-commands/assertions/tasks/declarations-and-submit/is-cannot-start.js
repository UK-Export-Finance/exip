import task from '.';

/**
 * Check that the "declarations and submit" task has a "cannot start" status.
 */
const checkTaskDeclarationsAndSubmitStatusIsCannotStart = () => {
  cy.checkTaskStatusCannotStart(task.status());
};

export default checkTaskDeclarationsAndSubmitStatusIsCannotStart;
