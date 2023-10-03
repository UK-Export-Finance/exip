import { submitButton } from '../../../pages/shared';

/**
 * clicks change link and checks that page goes to correct route
 * @param {Object} fieldVariables
 * @param {String} referenceNumber
 */
export const checkChangeLinkUrl = (fieldVariables, referenceNumber) => {
  const { route, fieldId, summaryList } = fieldVariables;

  summaryList.field(fieldId).changeLink().click();

  cy.assertChangeAnswersPageUrl(referenceNumber, route, fieldId);
};

/**
 * takes an input value, types it into the input box and submits form
 * @param {Object} fieldVariables
 * @param {Function} input cypress input selector for field
 * @param {Boolean} shouldSubmit flag for if submit button should be pressed, default to true
 */
export const changeAnswerField = (fieldVariables, input, shouldSubmit = true) => {
  const { newValueInput } = fieldVariables;

  cy.keyboardInput(input, newValueInput);

  if (shouldSubmit) {
    submitButton().click();
  }
};

/**
 * changes input for select inputs
 * @param {Object} fieldVariables
 * @param {Function} input cypress input selector
 */
export const changeAnswerSelectField = (fieldVariables, input) => {
  const { newValueInput } = fieldVariables;

  input.select(newValueInput);

  submitButton().click();
};

/**
 * checks if value is set in summary list
 * @param {Object} fieldVariables
 */
export const checkChangeAnswerRendered = (fieldVariables) => {
  const {
    newValue, fieldId, summaryList,
  } = fieldVariables;

  cy.checkText(
    summaryList.field(fieldId).value(),
    newValue,
  );
};
