import insurancePartials from '../../../../../partials/insurance';

const { taskList } = insurancePartials;

const task = taskList.submitApplication.tasks.declarationsAndSubmit;

/**
 * Check that the "declarations and submit" task has an "in progress" status.
 */
const checkTaskDeclarationsAndSubmitStatusIsInProgress = () => {
  cy.checkTaskStatusInProgress(task.status());
};

export default checkTaskDeclarationsAndSubmitStatusIsInProgress;
