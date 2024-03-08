/**
 * assertSummaryListRowValue
 * Assert a summary list row's value.
 * E.g assertSummaryListRowValue({ rowA: {...}, rowB: {...} }, 'startDate', '01/02/2023')
 * @param {Object} Summary list cypress selectors from pages/partials.
 * @param {String} Field ID in the summary list to assert
 * @param {String} Expected value
 * @param {Number} index eg the index of identical rows
 */
const assertSummaryListRowValue = (summaryList, fieldId, expected, index) => {
  if (index) {
    cy.checkText(
      summaryList.field(fieldId).value().eq(index),
      expected,
    );
  } else {
    cy.checkText(
      summaryList.field(fieldId).value(),
      expected,
    );
  }
};

export default assertSummaryListRowValue;
