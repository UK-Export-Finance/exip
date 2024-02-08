import task from '.';

/**
 * Check that the "buyer" task has a "not started yet" status.
 */
const checkTaskBuyerStatusIsNotStartedYet = () => {
  cy.checkTaskStatusNotStartedYet(task.status());
};

export default checkTaskBuyerStatusIsNotStartedYet;
