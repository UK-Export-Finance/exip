import { submitButton, inlineErrorMessage } from '../e2e/pages/shared';
import partials from '../e2e/partials';

/**
 * @param {String} field
 * @param {Number} errorIndex - index of error in errorSummary
 * @param {Number} errorSummaryLength - the number of expected errors in errorSummary
 * @param {String} errorMessage
 */
export default (field, errorIndex, errorSummaryLength, errorMessage) => {
  submitButton().click();

  partials.errorSummaryListItems().should('have.length', errorSummaryLength);

  cy.checkText(
    partials.errorSummaryListItems().eq(errorIndex),
    errorMessage,
  );

  partials.errorSummaryListItemLinks().eq(errorIndex).click();
  field.yesRadioInput().should('have.focus');

  cy.checkText(inlineErrorMessage(), `Error: ${errorMessage}`);
};
