import insurancePartials from '../../../../../partials/insurance';

const { taskList } = insurancePartials;

const task = taskList.prepareApplication.tasks.buyer;

/**
 * Check that the "buyer" task has a "not started yet" status.
 */
const checkTaskBuyerStatusIsNotStartedYet = () => {
  cy.checkTaskStatusNotStartedYet(task.status());
};

export default checkTaskBuyerStatusIsNotStartedYet;
