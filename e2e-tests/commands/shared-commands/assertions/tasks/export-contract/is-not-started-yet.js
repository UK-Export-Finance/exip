import task from '.';

/**
 * Check that the "export contract" task has a "not started yet" status.
 */
const checkTaskExportContractStatusIsNotStartedYet = () => {
  cy.checkTaskStatusNotStartedYet(task);
};

export default checkTaskExportContractStatusIsNotStartedYet;
