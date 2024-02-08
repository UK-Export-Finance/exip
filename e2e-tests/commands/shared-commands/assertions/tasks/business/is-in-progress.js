import insurancePartials from '../../../../../partials/insurance';

const { taskList } = insurancePartials;

const task = taskList.prepareApplication.tasks.business;

/**
 * Check that the "business" task has an "in progress" status.
 */
const checkTaskBusinessStatusIsInProgress = () => {
  cy.checkTaskStatusInProgress(task.status());
};

export default checkTaskBusinessStatusIsInProgress;
