import insurancePartials from '../../../../../partials/insurance';

const { taskList } = insurancePartials;

const task = taskList.prepareApplication.tasks.policy;

/**
 * Check that the "policy" task has an "in progress" status.
 */
const checkTaskPolicyStatusIsInProgress = () => {
  cy.checkTaskStatusInProgress(task.status());
};

export default checkTaskPolicyStatusIsInProgress;
