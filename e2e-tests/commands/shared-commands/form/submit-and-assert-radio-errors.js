import partials from '../../../partials';

/**
 * @param {String} field
 * @param {Number} errorIndex - index of error in errorSummary
 * @param {Number} errorSummaryLength - the number of expected errors in errorSummary
 * @param {Number} errorMessage - error message to assert
 * @param {Number} inlineErrorIndex - the index of radios to find error
 */
const submitAndAssertRadioErrors = (field, errorIndex, errorSummaryLength, errorMessage, inlineErrorIndex = 0) => {
  cy.clickSubmitButton();

  cy.checkErrorSummaryListHeading();

  cy.assertLength(partials.errorSummaryListItems(), errorSummaryLength);

  cy.checkText(
    partials.errorSummaryListItems().eq(errorIndex),
    errorMessage,
  );

  partials.errorSummaryListItemLinks().eq(errorIndex).click();

  field.input().should('have.focus');

  cy.checkText(field.errorMessage().eq(inlineErrorIndex), `Error: ${errorMessage}`);
};

export default submitAndAssertRadioErrors;
