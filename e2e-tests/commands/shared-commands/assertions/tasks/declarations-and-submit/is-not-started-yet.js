import insurancePartials from '../../../../../partials/insurance';

const { taskList } = insurancePartials;

const task = taskList.submitApplication.tasks.declarationsAndSubmit;

/**
 * Check that the "declarations and submit" task has a "not started yet" status.
 */
const checkTaskDeclarationsAndSubmitStatusIsNotStartedYet = () => {
  cy.checkTaskStatusNotStartedYet(task.status());
};

export default checkTaskDeclarationsAndSubmitStatusIsNotStartedYet;
