import insurancePartials from '../../../../../partials/insurance';

const { taskList } = insurancePartials;

const task = taskList.prepareApplication.tasks.business;

/**
 * Check that the "business" task has a "not started yet" status.
 */
const checkTaskBusinessStatusIsNotStartedYet = () => {
  cy.checkTaskStatusNotStartedYet(task.status());
};

export default checkTaskBusinessStatusIsNotStartedYet;
