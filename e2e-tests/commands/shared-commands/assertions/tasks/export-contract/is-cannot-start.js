import task from '.';

/**
 * Check that the "export contract" task has a "cannot start" status.
 */
const checkTaskExportContractStatusIsCannotStart = () => {
  cy.checkTaskStatusCannotStart(task);
};

export default checkTaskExportContractStatusIsCannotStart;
