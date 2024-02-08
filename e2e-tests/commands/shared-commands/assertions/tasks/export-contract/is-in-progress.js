import insurancePartials from '../../../../../partials/insurance';

const { taskList } = insurancePartials;

const task = taskList.prepareApplication.tasks.exportContract;

/**
 * Check the the "export contract" task has an "in progress" status.
 */
const checkTaskExportContractStatusIsInProgress = () => {
  cy.checkTaskStatusInProgress(task.status());
};

export default checkTaskExportContractStatusIsInProgress;
