import { errorSummaryListItems, errorSummaryListItemLinks } from '../../../partials';

/**
 * assertFieldErrors
 * Assert errors for a field
 * @param {string} field: Field selector
 * @param {number} errorIndex: Index of summary list error
 * @param {number} errorSummaryLength: The number of expected errors in the summary list
 * @param {string} errorMessage: Expected error message
 * @param {boolean} fieldShouldGainFocus: Input should gain focus after clicking the summary list error. Defaults to true
 */
const assertFieldErrors = ({ field, errorIndex, errorSummaryLength, errorMessage, fieldShouldGainFocus = true }) => {
  cy.checkErrorSummaryListHeading();

  cy.assertErrorSummaryListLength(errorSummaryLength);

  cy.checkText(errorSummaryListItems().eq(errorIndex), errorMessage);

  if (fieldShouldGainFocus) {
    errorSummaryListItemLinks().eq(errorIndex).click();
    field.input().should('have.focus');
  }

  cy.checkText(field.errorMessage(), `Error: ${errorMessage}`);
};

export default assertFieldErrors;
