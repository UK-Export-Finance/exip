import task from '.';

/**
 * Check that the "eligibility" task has a "completed" status.
 */
const checkTaskEligibilityStatusIsComplete = () => {
  cy.checkTaskStatusCompleted(task.status());
};

export default checkTaskEligibilityStatusIsComplete;
