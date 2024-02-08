import insurancePartials from '../../../../../partials/insurance';

const { taskList } = insurancePartials;

const task = taskList.prepareApplication.tasks.policy;

/**
 * Check that the "export contract" task has a "not started yet" status.
 */
const checkTaskExportContractStatusIsNotStartedYet = () => {
  cy.checkTaskStatusNotStartedYet(task.status());
};

export default checkTaskExportContractStatusIsNotStartedYet;
