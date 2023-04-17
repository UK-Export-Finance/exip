import partials from '../../../e2e/partials';

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

export default () => {
  task.link().click();

  // "Eligibility" check your answers
  cy.submitCheckYourAnswersForm();

  // "Policy and exports" check your answers
  cy.submitCheckYourAnswersForm();

  // "Your business" check your answers
  cy.submitCheckYourAnswersForm();

  // "Your buyer" check your answers
  cy.submitCheckYourAnswersForm();
};
