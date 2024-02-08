import insurancePartials from '../../../../../partials/insurance';

const { taskList } = insurancePartials;

const task = taskList.initialChecks.tasks.eligibility;

/**
 * Check that the "eligibility" task has a "completed" status.
 */
const checkTaskEligibilityStatusIsComplete = () => {
  cy.checkTaskStatusCompleted(task.status());
};

export default checkTaskEligibilityStatusIsComplete;
