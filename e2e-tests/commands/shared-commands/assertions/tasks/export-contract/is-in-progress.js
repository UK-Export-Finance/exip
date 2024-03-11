import task from '.';

/**
 * Check that the "export contract" task has an "in progress" status.
 */
const checkTaskExportContractStatusIsInProgress = () => {
  cy.checkTaskStatusInProgress(task.status);
};

export default checkTaskExportContractStatusIsInProgress;
