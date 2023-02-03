import { submitButton } from '../e2e/pages/shared';
import partials from '../e2e/partials';

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
    field.input().clear().type(fieldValue, { delay: 0 });
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
