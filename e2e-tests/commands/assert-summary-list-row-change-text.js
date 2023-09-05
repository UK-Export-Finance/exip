/**
 * assertSummaryListRowChangeText
 * Assert a summary list change link text.
 * @param {Object} Summary list cypress selectors from pages/partials.
 * @param {String} Field ID in the summary list to assert
 * @param {String} expectedChangeLinkText text for the change link
 */
const assertSummaryListRowChangeText = (summaryList, fieldId, expectedChangeLinkText) => {
  if (expectedChangeLinkText) {
    cy.checkText(
      summaryList.field(fieldId).changeLink(),
      expectedChangeLinkText,
    );
  } else {
    summaryList.field(fieldId).changeLink().should('not.exist');
  }
};

export default assertSummaryListRowChangeText;
