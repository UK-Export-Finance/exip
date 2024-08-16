import task from '.';

/**
 * Check that the "export contract" task has a "completed" status.
 */
const checkTaskExportContractStatusIsComplete = () => {
  cy.checkTaskStatusCompleted(task.status);
};

export default checkTaskExportContractStatusIsComplete;
