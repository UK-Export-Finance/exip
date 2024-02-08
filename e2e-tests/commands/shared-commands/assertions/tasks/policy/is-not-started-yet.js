import insurancePartials from '../../../../../partials/insurance';

const { taskList } = insurancePartials;

const task = taskList.prepareApplication.tasks.policy;

/**
 * Check that the "policy" task has a "not started yet" status.
 */
const checkTaskPolicyStatusIsNotStartedYet = () => {
  cy.checkTaskStatusNotStartedYet(task.status());
};

export default checkTaskPolicyStatusIsNotStartedYet;
