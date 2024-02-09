import task from '.';

/**
 * Check that the "buyer" task has an "in progress" status.
 */
const checkTaskBuyerStatusIsInProgress = () => {
  cy.checkTaskStatusInProgress(task.status());
};

export default checkTaskBuyerStatusIsInProgress;
