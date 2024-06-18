import task from '.';

/**
 * Check that the "policy" task has a "completed" status.
 */
const checkTaskPolicyStatusIsComplete = () => {
  cy.checkTaskStatusCompleted(task.status);
};

export default checkTaskPolicyStatusIsComplete;
