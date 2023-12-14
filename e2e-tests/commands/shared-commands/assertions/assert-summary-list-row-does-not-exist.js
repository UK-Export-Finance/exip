/**
 * assertSummaryListRowDoesNotExist
 * Assert a summary list row does not exist.
 * @param {Object} summaryList list cypress selectors from pages/partials.
 * @param {String} Field ID in the summary list to assert
 */
const assertSummaryListRowDoesNotExist = (summaryList, fieldId) => {
  summaryList.field(fieldId).key().should('not.exist');

  summaryList.field(fieldId).value().should('not.exist');

  summaryList.field(fieldId).changeLink().should('not.exist');
};

export default assertSummaryListRowDoesNotExist;
