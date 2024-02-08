import insurancePartials from '../../../../../partials/insurance';

const { taskList } = insurancePartials;

const task = taskList.prepareApplication.tasks.policy;

/**
 * Check that the "policy" task has a "completed" status.
 */
const checkTaskPolicyStatusIsComplete = () => {
  cy.checkTaskStatusCompleted(task.status());
};

export default checkTaskPolicyStatusIsComplete;
