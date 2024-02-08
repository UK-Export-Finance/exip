import insurancePartials from '../../../../../partials/insurance';

const { taskList } = insurancePartials;

const task = taskList.prepareApplication.tasks.policy;

/**
 * Check that the "policy" task has a "cannot start" status.
 */
const checkTaskPolicyStatusIsCannotStart = () => {
  cy.checkTaskStatusCannotStart(task.status());
};

export default checkTaskPolicyStatusIsCannotStart;
