/**
 * completeAndSubmitMultipleCheckYourAnswers
 * Complete and submit multiple "Application - Check your answers" forms.
 * @param {Integer} count: Amount of times to click the submit button.
 */
const completeAndSubmitMultipleCheckYourAnswers = ({ count }) => {
  const arr = new Array(count).fill();

  arr.forEach(() => {
    cy.submitCheckYourAnswersForm();
  });
};

export default completeAndSubmitMultipleCheckYourAnswers;
