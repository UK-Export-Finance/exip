import task from '.';

/**
 * Check that the "business" task has a "completed" status.
 */
const checkTaskBusinessStatusIsComplete = () => {
  cy.checkTaskStatusCompleted(task.status);
};

export default checkTaskBusinessStatusIsComplete;
