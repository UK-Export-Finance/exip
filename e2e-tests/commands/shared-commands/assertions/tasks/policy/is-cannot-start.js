import task from '.';

/**
 * Check that the "policy" task has a "cannot start" status.
 */
const checkTaskPolicyStatusIsCannotStart = () => {
  cy.checkTaskStatusCannotStart(task.status);
};

export default checkTaskPolicyStatusIsCannotStart;
