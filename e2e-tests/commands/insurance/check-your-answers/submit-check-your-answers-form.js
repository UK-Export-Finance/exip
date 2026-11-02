/**
 * submitCheckYourAnswersForm
 * Submit an "Application - Check your answers" form.
 * @param {string} expectedText: Optional button text to wait for before clicking.
 */
const submitCheckYourAnswersForm = ({ expectedText } = {}) => {
  cy.clickSubmitButton({ expectedText });
};

export default submitCheckYourAnswersForm;
