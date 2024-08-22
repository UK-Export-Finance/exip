/**
 * assertSummaryListRowValue
 * Assert a summary list row's value.
 * E.g assertSummaryListRowValue({ rowA: {...}, rowB: {...} }, 'startDate', '01/02/2023')
 * @param {Object} summaryList: Summary list cypress selectors from pages/partials.
 * @param {String} fieldId: Field ID in the summary list to assert
 * @param {String} expected: Expected value
 * @param {Number} index: Optional row index
 */
const assertSummaryListRowValue = (summaryList, fieldId, expected, index) => {
  if (index) {
    cy.checkText(summaryList.field(fieldId).value().eq(index), expected);
  } else {
    cy.checkText(summaryList.field(fieldId).value(), expected);
  }
};

export default assertSummaryListRowValue;
