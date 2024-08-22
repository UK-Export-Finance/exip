import task from '.';

/**
 * Check that the "policy" task has a "not started yet" status.
 */
const checkTaskPolicyStatusIsNotStartedYet = () => {
  cy.checkTaskStatusNotStartedYet(task);
};

export default checkTaskPolicyStatusIsNotStartedYet;
