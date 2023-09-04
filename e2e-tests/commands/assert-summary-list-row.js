import { LINKS, DEFAULT } from '../content-strings';

const assertSummaryListRow = (summaryList, fieldId, expectedKey, expectedValue, expectedChangeLinkText) => {
  const row = summaryList.field(fieldId);

  cy.assertSummaryListRowKey(summaryList, fieldId, expectedKey);

  /**
   * if value exists then checkText
   * else check if dash
   */
  if (expectedValue) {
    cy.assertSummaryListRowValue(summaryList, fieldId, expectedValue);
  } else {
    cy.assertSummaryListRowValue(summaryList, fieldId, DEFAULT.EMPTY);
  }

  /**
   * if change link text, if there is an expected value, then should contain change
   * else if no expected value, should say add
   * if no expectedChangeLinkText, then should not have changeLink
   */
  if (expectedChangeLinkText) {
    if (expectedValue) {
      cy.assertSummaryListRowChangeLink(summaryList, fieldId, `${LINKS.CHANGE} ${expectedChangeLinkText}`);

      cy.checkText(
        row.changeLink(),
        `${LINKS.CHANGE} ${expectedChangeLinkText}`,
      );
    } else {
      cy.assertSummaryListRowChangeLink(summaryList, fieldId, `${LINKS.ADD} ${expectedChangeLinkText}`);
    }
  } else {
    cy.assertSummaryListRowChangeLink(summaryList, fieldId);
  }
};

export default assertSummaryListRow;
