import { errorSummaryListItems, errorSummaryListItemLinks } from '../../../partials';

/**
 * @param {Object} field: Cypress selector.
 * @param {Number} errorIndex: Index of error. Defaults to 0.
 * @param {Number} expectedErrorsCount: Expected total amount of errors in the errors summary. Defaults to 1.
 * @param {Number} expectedErrorMessage: Expected error message.
 */
const submitAndAssertRadioErrors = ({ field, errorIndex = 0, expectedErrorsCount = 1, expectedErrorMessage }) => {
  cy.clickSubmitButton();

  cy.checkErrorSummaryListHeading();

  cy.assertErrorSummaryListLength(expectedErrorsCount);

  cy.checkText(errorSummaryListItems().eq(errorIndex), expectedErrorMessage);

  errorSummaryListItemLinks().eq(errorIndex).click();

  field.input().should('have.focus');

  cy.checkText(field.errorMessage(), `Error: ${expectedErrorMessage}`);
};

export default submitAndAssertRadioErrors;
