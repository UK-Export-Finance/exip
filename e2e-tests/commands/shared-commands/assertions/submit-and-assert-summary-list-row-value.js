/**
 * submitAndAssertSummaryListRowValue
 * Submits and asserts a summary list row's value.
 * @param {Object} Summary list cypress selectors from pages/partials.
 * @param {String} Field ID in the summary list to assert
 * @param {String} Expected value
 */
const submitAndAssertSummaryListRowValue = (summaryList, fieldId, expected) => {
  cy.clickSubmitButton();
  cy.assertSummaryListRowValue(summaryList, fieldId, expected);
};

export default submitAndAssertSummaryListRowValue;
