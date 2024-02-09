import task from '.';

/**
 * Check that the "buyer" task has a "completed" status.
 */
const checkTaskBuyerStatusIsComplete = () => {
  cy.checkTaskStatusCompleted(task.status());
};

export default checkTaskBuyerStatusIsComplete;
