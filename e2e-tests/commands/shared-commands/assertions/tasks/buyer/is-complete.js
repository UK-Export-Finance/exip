import insurancePartials from '../../../../../partials/insurance';

const { taskList } = insurancePartials;

const task = taskList.prepareApplication.tasks.buyer;

/**
 * Check that the "buyer" task has a "completed" status.
 */
const checkTaskBuyerStatusIsComplete = () => {
  cy.checkTaskStatusCompleted(task.status());
};

export default checkTaskBuyerStatusIsComplete;
