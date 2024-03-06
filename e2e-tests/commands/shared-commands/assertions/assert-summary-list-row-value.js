/**
 * assertSummaryListRowValue
 * Assert a summary list row's value.
 * E.g assertSummaryListRowValue({ rowA: {...}, rowB: {...} }, 'startDate', '01/02/2023')
 * @param {Object} Summary list cypress selectors from pages/partials.
 * @param {String} Field ID in the summary list to assert
 * @param {Number} fieldNumber eg the first or second answer of identical field_id'd rows
 * @param {String} Expected value
 */
const assertSummaryListRowValue = (summaryList, fieldId, expected, fieldNumber) => {
  if (fieldNumber) {
    cy.checkText(
      summaryList.field(fieldId).value().eq(fieldNumber),
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
