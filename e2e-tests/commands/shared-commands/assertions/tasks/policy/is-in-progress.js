import task from '.';

/**
 * Check that the "policy" task has an "in progress" status.
 */
const checkTaskPolicyStatusIsInProgress = () => {
  cy.checkTaskStatusInProgress(task.status());
};

export default checkTaskPolicyStatusIsInProgress;
