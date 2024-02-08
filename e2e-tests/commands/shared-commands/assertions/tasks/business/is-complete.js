import insurancePartials from '../../../../../partials/insurance';

const { taskList } = insurancePartials;

const task = taskList.prepareApplication.tasks.business;

/**
 * Check that the "business" task has a "completed" status.
 */
const checkTaskBusinessStatusIsComplete = () => {
  cy.checkTaskStatusCompleted(task.status());
};

export default checkTaskBusinessStatusIsComplete;
