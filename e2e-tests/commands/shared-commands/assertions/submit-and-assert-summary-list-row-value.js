/**
 * submitAndAssertSummaryListRowValue
 * Submits and asserts a summary list row's value.
 * @param {object} summaryList: Summary list cypress selectors from pages/partials.
 * @param {string} fieldId: Field ID in the summary list to assert
 * @param {string} expected: Expected value
 */
const submitAndAssertSummaryListRowValue = (summaryList, fieldId, expected) => {
  cy.clickSubmitButton();
  cy.assertSummaryListRowValue(summaryList, fieldId, expected);
};

export default submitAndAssertSummaryListRowValue;
