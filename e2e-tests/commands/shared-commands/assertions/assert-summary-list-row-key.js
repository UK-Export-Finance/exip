/**
 * assertSummaryListRowKey
 * Assert a summary list row's key.
 * @param {object} summaryList: Summary list cypress selectors from pages/partials.
 * @param {string} fieldId: Field ID in the summary list to assert
 * @param {string} expected: Expected value
 */
const assertSummaryListRowKey = (summaryList, fieldId, expected) => {
  cy.checkText(summaryList.field(fieldId).key(), expected);
};

export default assertSummaryListRowKey;
