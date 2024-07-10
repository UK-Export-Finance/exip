import partials from '../../../partials';

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

/**
 * completeAndSubmitCheckYourAnswers
 * Complete and submit all "Application - Check your answers" forms:
 * 1) Your business
 * 2) Your buyer
 * 3) Policy
 * 4) Export contract
 */
const completeAndSubmitCheckYourAnswers = () => {
  task.link().click();

  cy.completeAndSubmitMultipleCheckYourAnswers({ count: 4 });
};

export default completeAndSubmitCheckYourAnswers;
