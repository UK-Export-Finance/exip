import partials from '../../../partials';

/**
 * @param {Object} field: Cypress selector
 * @param {Number} errorIndex: index of error in errorSummary
 * @param {Number} expectedErrorsCount: the number of expected errors in errorSummary
 * @param {Number} errorMessage: error message to assert
 * @param {Number} inlineErrorIndex: the index of radios to find error
 */
const submitAndAssertRadioErrors = ({
  field,
  errorIndex = 0,
  expectedErrorsCount,
  expectedErrorMessage,
  inlineErrorIndex = 0,
}) => {
  cy.clickSubmitButton();

  cy.checkErrorSummaryListHeading();

  cy.assertErrorSummaryListLength(expectedErrorsCount);

  cy.checkText(
    partials.errorSummaryListItems().eq(errorIndex),
    expectedErrorMessage,
  );

  partials.errorSummaryListItemLinks().eq(errorIndex).click();

  field.input().should('have.focus');

  cy.checkText(field.errorMessage().eq(inlineErrorIndex), `Error: ${expectedErrorMessage}`);
};

export default submitAndAssertRadioErrors;
