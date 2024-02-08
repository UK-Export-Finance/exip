import insurancePartials from '../../../../../partials/insurance';

const { taskList } = insurancePartials;

const task = taskList.prepareApplication.tasks.exportContract;

/**
 * Check the the "export contract" task has a "completed" status.
 */
const checkTaskBusinessStatusIsComplete = () => {
  cy.checkTaskStatusCompleted(task.status());
};

export default checkTaskBusinessStatusIsComplete;
