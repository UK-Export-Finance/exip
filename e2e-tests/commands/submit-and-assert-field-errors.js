import { submitButton } from '../pages/shared';
import partials from '../partials';

/**
 * @param {String} field
 * @param {String} fieldValue - the value to input - can be null
 * @param {Number} errorIndex - index of error in errorSummary
 * @param {Number} errorSummaryLength - the number of expected errors in errorSummary
 * @param {String} errorMessage
 */
export default (field, fieldValue, errorIndex, errorSummaryLength, errorMessage) => {
  // only type if a field value is provided
  if (fieldValue) {
    cy.keyboardInput(field.input(), fieldValue);
  } else {
    field.input().clear();
  }

  submitButton().click();

  partials.errorSummaryListItems().should('have.length', errorSummaryLength);

  cy.checkText(
    partials.errorSummaryListItems().eq(errorIndex),
    errorMessage,
  );

  partials.errorSummaryListItemLinks().eq(errorIndex).click();
  field.input().should('have.focus');

  cy.checkText(field.errorMessage(), `Error: ${errorMessage}`);
};
