/**
 * assertSummaryListRowKey
 * Assert a summary list row's key.
 * @param {Object} Summary list cypress selectors from pages/partials.
 * @param {String} Field ID in the summary list to assert
 * @param {String} Expected value
 */
const assertSummaryListRowKey = (summaryList, fieldId, expected) => {
  cy.checkText(
    summaryList.field(fieldId).key(),
    expected,
  );
};

export default assertSummaryListRowKey;
