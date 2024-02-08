import insurancePartials from '../../../../../partials/insurance';

const { taskList } = insurancePartials;

const task = taskList.prepareApplication.tasks.policy;

/**
 * Check that the "export contract" task has a "cannot start" status.
 */
const checkTaskExportContractStatusIsCannotStart = () => {
  cy.checkTaskStatusCannotStart(task.status());
};

export default checkTaskExportContractStatusIsCannotStart;
