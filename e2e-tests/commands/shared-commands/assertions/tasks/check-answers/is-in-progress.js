import insurancePartials from '../../../../../partials/insurance';

const { taskList } = insurancePartials;

const task = taskList.submitApplication.tasks.declarationsAndSubmit;

/**
 * Check that the "check answers" task has an "in progress" status.
 */
const checkTaskCheckAnswersStatusIsInProgress = () => {
  cy.checkTaskStatusInProgress(task.status());
};

export default checkTaskCheckAnswersStatusIsInProgress;
