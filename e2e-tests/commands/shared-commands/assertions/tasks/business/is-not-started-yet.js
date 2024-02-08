import task from '.';

/**
 * Check that the "business" task has a "not started yet" status.
 */
const checkTaskBusinessStatusIsNotStartedYet = () => {
  cy.checkTaskStatusNotStartedYet(task.status());
};

export default checkTaskBusinessStatusIsNotStartedYet;
