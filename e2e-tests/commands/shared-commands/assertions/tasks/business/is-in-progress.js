import task from '.';
/**
 * Check that the "business" task has an "in progress" status.
 */
const checkTaskBusinessStatusIsInProgress = () => {
  cy.checkTaskStatusInProgress(task.status);
};

export default checkTaskBusinessStatusIsInProgress;
