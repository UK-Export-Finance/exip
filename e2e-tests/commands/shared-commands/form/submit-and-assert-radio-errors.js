import partials from '../../../partials';

/**
 * @param {Object} field: Cypress selector.
 * @param {Number} errorIndex: Index of error. Defaults to 0.
 * @param {Number} expectedErrorsCount: Expected total amount of errors in the errors summary.
 * @param {Number} expectedErrorMessage: Expected error message.
 */
const submitAndAssertRadioErrors = ({
  field,
  errorIndex = 0,
  expectedErrorsCount,
  expectedErrorMessage,
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

  cy.checkText(field.errorMessage().eq(errorIndex), `Error: ${expectedErrorMessage}`);
};

export default submitAndAssertRadioErrors;
