import insurancePartials from '../../../../../partials/insurance';

const { taskList } = insurancePartials;

const task = taskList.prepareApplication.tasks.buyer;

/**
 * Check the the "buyer" task has an "in progress" status.
 */
const checkTaskBuyerStatusIsInProgress = () => {
  cy.checkTaskStatusInProgress(task.status());
};

export default checkTaskBuyerStatusIsInProgress;
