/**
 * takes an input value, types it into the input box and submits form
 * @param {object} fieldVariables
 * @param {Function} input cypress input selector for field
 * @param {boolean} shouldSubmit flag for if submit button should be pressed, default to true
 */
const changeAnswerField = (fieldVariables, input, shouldSubmit = true) => {
  const { newValueInput } = fieldVariables;

  cy.keyboardInput(input, newValueInput);

  if (shouldSubmit) {
    cy.clickSubmitButton();
  }
};
export default changeAnswerField;
