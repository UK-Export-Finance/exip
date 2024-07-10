import partials from '../../../partials';

/**
 * assertFieldErrors
 * Assert errors for a field
 * @param {String} field: Field selector
 * @param {Number} errorIndex: Index of summary list error
 * @param {Number} errorSummaryLength: The number of expected errors in the summary list
 * @param {String} errorMessage: Expected error message
 * @param {Boolean} fieldShouldGainFocus: Input should gain focus after clicking the summary list error. Defaults to true
 */
const assertFieldErrors = ({
  field,
  errorIndex,
  errorSummaryLength,
  errorMessage,
  fieldShouldGainFocus = true,
}) => {
  cy.checkErrorSummaryListHeading();

  cy.assertErrorSummaryListLength(errorSummaryLength);

  cy.checkText(
    partials.errorSummaryListItems().eq(errorIndex),
    errorMessage,
  );

  if (fieldShouldGainFocus) {
    partials.errorSummaryListItemLinks().eq(errorIndex).click();
    field.input().should('have.focus');
  }

  cy.checkText(field.errorMessage(), `Error: ${errorMessage}`);
};

export default assertFieldErrors;
