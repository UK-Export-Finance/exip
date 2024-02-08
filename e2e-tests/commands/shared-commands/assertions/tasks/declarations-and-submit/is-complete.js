import insurancePartials from '../../../../../partials/insurance';

const { taskList } = insurancePartials;

const task = taskList.submitApplication.tasks.declarationsAndSubmit;

/**
 * Check that the "declarations and submit" task has a "completed" status.
 */
const checkTaskDeclarationsAndSubmitStatusIsComplete = () => {
  cy.checkTaskStatusCompleted(task.status());
};

export default checkTaskDeclarationsAndSubmitStatusIsComplete;
