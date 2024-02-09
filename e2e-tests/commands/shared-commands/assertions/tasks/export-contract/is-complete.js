import task from '.';

/**
 * Check that the "export contract" task has a "completed" status.
 */
const checkTaskBusinessStatusIsComplete = () => {
  cy.checkTaskStatusCompleted(task.status());
};

export default checkTaskBusinessStatusIsComplete;
